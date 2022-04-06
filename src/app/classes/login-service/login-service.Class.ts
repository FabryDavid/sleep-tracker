import {EventEmitter} from "@angular/core";

export class LoginService {
  public static loggedInEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()

  public static logInUser() {
    this.loggedInEmitter.emit(true)
  }

  public static logOutUser() {
    this.loggedInEmitter.emit(false)
  }

  public static triggerEvent(value:boolean){
    this.loggedInEmitter.emit(value)
  }
}
