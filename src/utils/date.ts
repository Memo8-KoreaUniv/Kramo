export const formatDate = (inputDate: Date, now: Date): string => {
  const today: boolean =
    inputDate.getFullYear() === now.getFullYear() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getDate() === now.getDate()
  const year: string =
    inputDate.getFullYear() === now.getFullYear()
      ? ''
      : `${inputDate.getFullYear()}년 `

  const date: string = today
    ? ''
    : `${inputDate.getMonth() + 1}월 ${inputDate.getDate()}일 `

  const time: string = today
    ? compareTime(inputDate, now)
    : `${inputDate.getHours()}시 ${inputDate.getMinutes()}분`
  return `${year}${date}${time}`
}

const compareTime = (a: Date, b: Date): string => {
  const hoursCollapsed: number = b.getHours() - a.getHours()
  const minutesCollapsed: number =
    hoursCollapsed * 60 + b.getMinutes() - a.getMinutes()
  return minutesCollapsed >= 60
    ? `${hoursCollapsed}시간 전`
    : `${minutesCollapsed}분 전`
}
