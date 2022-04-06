import {IUser} from "../../interfaces/iuser.Interface";
import {v4 as uuidv4} from 'uuid';

export class User implements IUser {
  constructor(
    public email: string,
    public password: string,
    public id = ''
  ) {
    if (!this.id) {
      this.id = uuidv4()
    }
    console.log('this.id')
    console.log(this.id)
  }
}
