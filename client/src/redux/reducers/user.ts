import { UserState, UserActions, ADD_USER, REMOVE_USER } from '../../types'

export default function user(
  state: UserState = {
    user: {
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
      postal_code: 0,
      country: '',
      lat: 0,
      lng: 0,
      profile_text: '',
      profile_image: ''
    },
    loading: false,
    status: '',
    message: ''
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action.payload
      return { ...state, user: user }
    }
    case REMOVE_USER: {
      return {
        ...state,
        user: {
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
          postal_code: 0,
          country: '',
          lat: 0,
          lng: 0,
          profile_text: '',
          profile_image: ''
        }
      }
    }

    default:
      return state
  }
}
