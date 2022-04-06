import {IUser} from "../interfaces/iuser.Interface";
import axios from 'axios'

export async function registerUser(user: IUser): Promise<null | IUser> {
  await getUserByEmail(user.email).then((response) => {
    if (response) {
      if (response.length > 0) {
        throw new Error('User already registered with this email')
      }
    }
  })

  let data;
  await axios.post('users', user).then((response) => {
    data = response.data
  })

  return data ? data as IUser : null
}

export async function getUserByEmail(email: string): Promise<null | IUser[]> {
  let data;
  await axios.get(`users?email=${email}`).then((response) => {
    if (response.status === 200) {
      data = response.data
    }
  })

  return data ? data as IUser[] : null
}
