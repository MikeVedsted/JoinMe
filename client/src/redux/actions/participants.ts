import axios from 'axios'

export const deleteParticipant = async (participantId: string) => {
  await axios.delete(`/api/v1/requests/${participantId}/remove-participant`)
}
