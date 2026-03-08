
export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

export const calculateDurationInMonths = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  return months > 0 ? months : 0
}

export const formatDateForInput = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

export const getDurationLabel = (startDate, endDate) => {
  const months = calculateDurationInMonths(startDate, endDate)
  return `${months} month${months !== 1 ? 's' : ''}`
}
