export function fibonacci(num) {
  const list = [0, 1]

  while (list.length < num) {
    const a = list[list.length - 1]
    const b = list[list.length - 2]
    list.push(a + b)
  }

  return list
}
