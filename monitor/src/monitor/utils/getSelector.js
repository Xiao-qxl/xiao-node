function getSelector(path) {
  return path
    .reverse()
    .filter(el => el !== document && el !== window)
    .map(el => {
      let selector = '';
      if (el.id) {
        return `${el.nodeName.toLowerCase()}#${el.id}`
      }else if (el.className && typeof el.className === 'string') {
        return `${el.nodeName.toLowerCase()}.${el.className}`
      }else {
        selector = el.nodeName.toLowerCase()
      }
      return selector
    })
    .join(' ')
}

export default function (event) {
  const path = event.path || event.composedPath()
  if (Array.isArray(path)) {
    return getSelector(path)
  }
}
