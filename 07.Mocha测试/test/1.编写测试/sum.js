module.exports = (...rest) => {
  let sum = 0;
  for (const i of rest) {
    sum += i
  }
  return sum
}
