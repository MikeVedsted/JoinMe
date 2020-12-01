export type GoogleToken = {
  given_name : string
  family_name : string
  email : string
  picture : string
}

export type Event = {
  title : string
  category : number
  date : Date | string
  time : string
  description : string
  max_participants : number
  address : number
  expires_at : Date
  image : string
}
