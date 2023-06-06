const getLogin = document.querySelector('#loginGet')
const postLogin = document.querySelector('#loginPost')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

getLogin.onclick = () => {
fetch(`/api/login?username=${username.value}&password=${password.value}`)
  .then(res => res.json())
  .then(res => {
    console.log(res)
  })
}

postLogin.onclick = () => {
fetch(`/api/loginpost`, {
  method: 'POST',
  body: JSON.stringify({
    username: username.value,
    password: password.value,
  }),
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})
  .then(res => res.text())
  .then(res => {
    console.log(res)
  })
}
