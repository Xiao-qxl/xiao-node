<script setup>
import {onMounted, ref} from "vue";
import {convertFileSrc, invoke} from "@tauri-apps/api/tauri";
import {listen} from '@tauri-apps/api/event';
import {fetch} from '@tauri-apps/api/http'
import {BaseDirectory, readBinaryFile} from '@tauri-apps/api/fs';
import {appConfigDir, join, resourceDir} from '@tauri-apps/api/path';
import { ask, confirm, open } from '@tauri-apps/api/dialog';
import {appWindow, WebviewWindow} from '@tauri-apps/api/window'

const greetMsg = ref("");
const name = ref("");
// 欢迎函数
async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}
// 调用rust方法
async function getSum() {
  const a = 0.07
  const b = 100
  console.log(a * b)
  const product = await invoke("my_custom_command", { a, b });
  console.log(product)
}

// 进程监听事件
const initProcess = async () => {
  await invoke("init_process");
  await listen('event-name', (event) => {
    console.log(event);
  });
}
// 获取天气信息
const getWeather = async () => {
  const data = await fetch("https://uapis.cn/api/weather?name=北京市", {
    method: 'GET',
    timeout: 3000
  })
  console.log(data)
}
// 读取静态文件
const readImg = async () => {
  const contents = await readBinaryFile('img/avatar.png', { dir: BaseDirectory.Resource });
  console.log(contents)
}
// 读取文件路径
const imgSrc = ref('')
const getImgUrl = async () => {
  const resourceDirPath = await resourceDir();
  const filePath = await join(resourceDirPath, 'img\\avatar.png');
  imgSrc.value = convertFileSrc(filePath)
}

// 弹出框
const dialogAsk = async () => {
  const yes = await ask(
    'Are you sure?',
    { title: 'Tauri', type: 'warning' }
  );
  console.log(yes)
}

const dialogConfirm = async () => {
  const confirmed = await confirm(
    'This action cannot be reverted. Are you sure?',
    { title: 'Tauri', type: 'warning' }
  );
  console.log(confirmed)
}

const dialogOpen = async () => {
  // Open a selection dialog for image files
  const selected = await open({
    multiple: true,
    filters: [{
      name: 'Image',
      extensions: ['png', 'jpeg'],
    }],
    defaultPath: await appConfigDir()
  });
  console.log(selected)
  if (Array.isArray(selected)) {
    // user selected multiple files
  } else if (selected === null) {
    // user cancelled the selection
  } else {
    // user selected a single file
  }
}

// 生成一个新窗口
const newWindow = () => {
  // const mainWindow = WebviewWindow.getByLabel('splashscreen')
  appWindow.hide()
  const webview = new WebviewWindow('theUniqueLabel', {
    url: 'test.html',
  })
  webview.once('tauri://created', function () {
    // webview window successfully created
    console.log('successfully created')
    appWindow.close();
  })
  webview.once('tauri://error', function (e) {
    // an error occurred during webview window creation
  })
}

// 生成一个新窗口
const newWindowTwo = () => {
  const appWindow = WebviewWindow.getByLabel('test')
  appWindow?.show()
}

onMounted(() => {
  setTimeout(() => {
    invoke('close_splashscreen')
  }, 3000)
})
</script>

<template>
  <form class="row" @submit.prevent="greet">
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>
  </form>

  <p>{{ greetMsg }}</p>

  <div style="display: grid; grid-template-columns: repeat(5, 1fr)">
    <button @click="getSum">求两数和</button>
    <button @click="initProcess">启动事件</button>
    <button @click="getWeather">获取天气</button>
    <button @click="readImg">读取图片</button>
    <div>
      <button @click="getImgUrl">读取图片路径</button>
      <img width="32" height="32" :src="imgSrc" alt="图片">
    </div>
    <button @click="dialogAsk">弹框ask</button>
    <button @click="dialogConfirm">弹框confirm</button>
    <button @click="dialogOpen">弹框open</button>
    <button @click="newWindow">新窗口</button>
    <button @click="newWindowTwo">新窗口</button>
  </div>
</template>
