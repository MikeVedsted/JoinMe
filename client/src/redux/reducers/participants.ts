import {
  ParticipantsState,
  ParticipantsActions,
  FETCH_PARTICIPANTS_REQUESTED,
  FETCH_PARTICIPANTS_SUCCEED,
  FETCH_PARTICIPANTS_FAILED
} from '../../Types'

const initState: ParticipantsState = {
  participants: []
}

export default function participant(
  state: ParticipantsState = initState,
  action: ParticipantsActions
): ParticipantsState {
  switch (action.type) {
    case FETCH_PARTICIPANTS_REQUESTED:
      return { ...state }

    case FETCH_PARTICIPANTS_SUCCEED:
      const participantResponse = action.payload
      return { ...state, participants: participantResponse }
    case FETCH_PARTICIPANTS_FAILED:
      return { ...state }
    default:
      return state
  }
}
