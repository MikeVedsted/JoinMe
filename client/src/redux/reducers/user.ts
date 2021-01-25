import { UserState, UserActions, ADD_USER, REMOVE_USER } from '../../Types'

const initState: UserState = {
  user_id: '',
  email: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  gender: '',
  base_address: '',
  street: '',
  number: '',
  city: '',
  postal_code: parseInt(''),
  country: '',
  lat: parseInt(''),
  lng: parseInt(''),
  profile_text: '',
  profile_image: '',
  created_at: ''
}

export default function user(
  state: UserState = initState,
  action: UserActions
): UserState {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action.payload
      return { ...state, ...user }
    }
    case REMOVE_USER: {
      return { ...state, ...initState }
    }
    default:
      return state
  }
}
