export type GoogleToken = {
  payload: {
    given_name: string;
    family_name: string;
    email: string;
    picture: string;
  }
}