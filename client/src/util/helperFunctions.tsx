export const calculateEventAge = (eventDate: string) => {
  const diff = new Date().getTime() - new Date(eventDate).getTime()
  const hours = parseInt((diff / 3600000).toFixed(0))
  if (hours <= 24) {
    return hours + ' hour(s)'
  } else if (hours > 24 && hours <= 730) {
    const days = (hours / 24).toFixed(0)
    return days + ' day(s)'
  } else if (hours > 730 && hours <= 8640) {
    const months = (hours / 730).toFixed()
    return months + ' month(s)'
  } else {
    const years = (hours / 8640).toFixed(0)
    return years + ' year(s)'
  }
}

export const convertDate = (date: string) => {
  const birthYear = new Date(date).getFullYear()
  const birthMonth = new Date(date).getMonth() + 1
  const birthDay = new Date(date).getDate()
  return birthYear + '-' + birthMonth + '-' + birthDay
}
