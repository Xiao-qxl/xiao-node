// https://mp.weixin.qq.com/s/c9kVJd6xExC6gKZE7AMmbw
/*
两数之和
  题目：给定一个数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个数
  输入：nums: [8, 2, 6, 5, 4, 1, 3] ；target:7
  输出：[2, 5]
*/
// 时间复杂度O(n)、 空间复杂度O(n)
function twoNumAdd(arr, target) {
  if (Array.isArray(arr)) {
    // 使用map将遍历过的数字存起来，空间换时间
    let map = {};
    for (let i = 0; i < arr.length; i++) {
      // 从map中查找是否有key 等于 target-nums[i]，如果有，则条件成立，返回结果
      if (map[target - arr[i]] !== undefined) {
        console.log(map)
        return [target - arr[i], arr[i]];
      } else {
        // 条件不成立，将该值存起来
        map[arr[i]] = i;
      }
    }
  }
  return [];
}

/*
* 三数之和
题目：给定一个数组nums，判断 nums 中是否存在三个元素a，b，c，使得 a + b + c = target，找出所有满足条件且不重复的三元组合
输入：nums: [5, 2, 1, 1, 3, 4, 6] ；target:8
输出：[[1, 1, 6], [1, 2, 5], [1, 3, 4]]
* */
// 用`双端指针`的方式，将三数之和转化为两数之和
function findThree(arr, target) {
  // 先将数组从小到大排序
  arr.sort();
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    // 跳过重复的arr[i]值, 比如[2, 1, 1],跳过第二个1
    if (i && arr[i] === arr[i - 1]) continue;
    let left = i + 1;
    let right = arr.length - 1;

    // 双端指针left、right
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right];
      if (sum > target) {
        right--;
      } else if (sum < target) {
        left++;
      } else {
        // 先取arr[left]，然后left++, 两步合成一步；arr[right--]同样的逻辑
        result.push([arr[i], arr[left++], arr[right--]]);
        while (arr[left] === arr[left - 1]) {
          // 跳过重复的arr[left]值,
          left++;
        }
        while (arr[right] === arr[right + 1]) {
          // 跳过重复的arr[right]值
          right--;
        }
      }
    }
  }
  return result;
}

/*
* 版本号排序
题目：输入一组版本号，输出从大到小的排序
输入：['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5']
输出：['10.2.1', '5.1.2', '2.1.0.1', '1.0.4.5', '0.402.1']
* */
function versionSort(arr) {
  return arr.sort((a, b) => {
    let i = 0;
    const arr1 = a.split(".");
    const arr2 = b.split(".");
    while (true) {
      // 取出相同位置的数字
      const s1 = arr1[i];
      const s2 = arr2[i];
      i++;
      // 若s1 或 s2 不存在，说明相同的位置已比较完成，接下来比较arr1 与 arr2的长度，长的版本号大
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue;
      // 比较相同位置的数字大小
      return s2 - s1;
    }
  });
}
/*
* 第一个不重复的字符
题目：输入一个字符串，找到第一个不重复字符的下标
输入：'abcabcde'
输出：6
* */
// 时间复杂度O(n)、 空间复杂度O(n)
function findOneStr(str) {
  if (!str) return -1;
  // 使用map存储每个字符出现的次数
  let map = {};
  let arr = str.split("");
  arr.forEach(item => {
    let val = map[item];
    // val为undefined时，表示未存储，map[item] = 1；否则map[item] = val + 1
    map[item] = val ? val + 1 : 1;
  });
  // 再遍历一遍找到出现1次的下标
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]] === 1) {
      return i;
    }
  }
  return -1;
}

/*
* 字符串所有排列组合
题目：输入一个字符串，打印出该字符串中，所有字符的排列组合
输入：'abc'
输出：['abc', 'acb', 'bca', 'bac', 'cab', 'cba']
* */
/**
 * 利用回溯算法，计算所有字符串的组合
 * @param {array} list - 字符串列表
 * @param {array} result - 最终的结果
 * @param {string} current - 当前的字符串
 * @param {string} temp - 当前固定的字符
 */
function stringGroup(list = [], result = [], current = "", temp = "") {
  current += temp;
  if (list.length === 0) {
    // 递归的出口，将对应结果添加到list中
    return result.push(current);
  }
  for (let i = 0; i < list.length; i++) {
    // 每次递归 固定第一个字符
    temp = list.shift();
    stringGroup(list, result, current, temp);
    // 将删除的temp重新添加到queue尾部，实现将数组反转的效果，如[a,b,c]反转为[c,b,a]
    list.push(temp);
  }
  // 这里去重是解决str中有重复的字母，比如str为'aacd'
  return [...new Set(result)];
}
/*
* 冒泡排序
* 时间复杂度为O(n²)，稳定排序算法
* */
function bubbleSort(arr) {
  let length = arr.length;
  // 外层循环用控制 排序进行多少轮
  for (let i = 0; i < length; i++) {
    // 内层循环用于每一轮的数据比较
    // 注意j的长度范围 length - i - 1
    for (let j = 0; j < length - i - 1; j++) {
      // 相邻元素，大的放到后面
      if (arr[j] > arr[j + 1]) {
        // 交换位置
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
