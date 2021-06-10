export const pageParser = (
  arr: Array<any>,
  page: number | string,
  count: number | string,
): Array<any> => {
  page = typeof page === 'number' ? page : parseInt(page)
  count = typeof count === 'number' ? count : parseInt(count)
  const startIndex = (page - 1) * count
  if (startIndex >= arr.length) {
    return []
  }
  const endIndex =
    startIndex + count <= arr.length ? startIndex + count : arr.length
  return arr.slice(startIndex, endIndex)
}
