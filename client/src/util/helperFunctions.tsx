export const calculateEventAge = (eventDate: string) => {
  const diff = new Date().getTime() - new Date(eventDate).getTime()
  const hours = parseInt((diff / 3600000).toFixed(0))
  if (hours <= 24) {
    return hours + 'h'
  } else if (hours > 24 && hours <= 730) {
    const days = (hours / 24).toFixed(0)
    return days + 'd'
  } else if (hours > 730 && hours <= 8640) {
    const months = (hours / 730).toFixed()
    return months + 'm'
  } else {
    const years = (hours / 8640).toFixed(0)
    return years + 'y'
  }
}
