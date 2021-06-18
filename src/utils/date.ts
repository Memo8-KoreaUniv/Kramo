export const formatDate = (inputDate: Date, now: Date): string => {
  const today =
    inputDate.getFullYear() === now.getFullYear() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getDate() === now.getDate()
  const year =
    inputDate.getFullYear() === now.getFullYear()
      ? ''
      : `${inputDate.getFullYear()}년`

  const date = today
    ? ''
    : `${inputDate.getMonth() + 1}월 ${inputDate.getDate()}일`

  const time = today
    ? compareTime(inputDate, now)
    : `${inputDate.getHours()}시 ${inputDate.getMinutes()}분`
  return `${year} ${date} ${time}`
}

const compareTime = (a: Date, b: Date): string => {
  const hoursCollapsed: number = b.getHours() - a.getHours()
  const minutesCollapsed: number =
    (b.getHours() - a.getHours()) * 60 + b.getMinutes() - a.getMinutes()
  return minutesCollapsed >= 60
    ? `${hoursCollapsed}시간 전`
    : `${minutesCollapsed}분 전`
}
