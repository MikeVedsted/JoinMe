import axios from 'axios'

export const rejectJoinRequest = async (requestId: string) => {
  await axios.post(`/api/v1/requests/${requestId}/accept`)
}

export const approveJoinRequest = async (requestId: string) => {
  await axios.delete(`/api/v1/requests/${requestId}/reject`)
}
