import {getUserByEmail} from "../../services/userService";
import {IUser} from "../../interfaces/iuser.Interface";
import {LoginService} from "../login-service/login-service.Class";
import {IncorrectPasswordException} from "../../exceptions/incorrect-password/incorrect-password-exception.Class";

export abstract class LocalStorageWorker {
  static loggedInUserKey = "loggedInUserId"

  public static getCurrentUserId(): string | null {
    return localStorage.getItem(this.loggedInUserKey)
  }

  public static isLoggedIn(): boolean {
    return !!this.getCurrentUserId()
  }

  public static async loginUser(user: IUser): Promise<boolean> {
    let loginSuccess = false
    await getUserByEmail(user.email).then((response) => {
      if (response && response.length === 1) {
        const u = response[0]

        if (u.email === user.email && u.password === user.password) {
          localStorage.setItem(this.loggedInUserKey, response[0].id)
          loginSuccess = true
        }
      }
    })

    if (!loginSuccess) {
      throw new IncorrectPasswordException("Incorrect password or email")
    }

    LoginService.triggerEvent(loginSuccess)
    return loginSuccess
  }

  static logoutUser() {
    localStorage.setItem(this.loggedInUserKey, "")
    LoginService.logOutUser()
  }
}
