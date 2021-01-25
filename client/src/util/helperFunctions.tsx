import { Address } from '../Types'

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

export const formatTime = (time: string) => {
  return time.slice(0, 5)
}

export const formatDate = (date: string) => {
  return date.slice(0, 10).split('-').reverse().join('-')
}

export const formatAddress = (addressObject: Address) => {
  const { street, number, postal_code, city } = addressObject
  let num = number.replace(/\s+/g, '')
  num = num.length > 0 ? ` ${num}, ` : ', '
  let pos = postal_code.replace(/\s+/g, '')
  pos = pos.length > 0 ? `${pos} ` : ''
  return street + num + pos + city
}

export const screenGreaterThan = (width: number) => {
  return window.innerWidth > width
}
