import {getUserByEmail} from "../../services/userService";
import {IUser} from "../../interfaces/iuser.Interface";
import {IncorrectPasswordException} from "../../exceptions/incorrect-password/incorrect-password-exception.Class";
import {TimerService} from "../../services/timer-service/timer.service";
import {Injectable} from "@angular/core";
import {LoginService} from "../../services/login-service/login.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageWorker {
  static loggedInUserKey = "loggedInUserId"
  static timerKey = "timerStartTime"

  constructor(
    private loginService: LoginService,
    private timerService: TimerService
  ) {
  }

  public getCurrentUserId(): string | null {
    return localStorage.getItem(LocalStorageWorker.loggedInUserKey)
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUserId()
  }

  public async loginUser(user: IUser): Promise<boolean> {
    let loginSuccess = false
    await getUserByEmail(user.email).then((response) => {
      if (response && response.length === 1) {
        const u = response[0]

        if (u.email === user.email && u.password === user.password) {
          localStorage.setItem(LocalStorageWorker.loggedInUserKey, response[0].id)
          loginSuccess = true
        }
      }
    })

    if (!loginSuccess) {
      throw new IncorrectPasswordException("Incorrect password or email")
    }

    if (loginSuccess) {
      this.loginService.login()
    } else {
      this.loginService.logout()
    }

    return loginSuccess
  }

  logoutUser() {
    localStorage.setItem(LocalStorageWorker.loggedInUserKey, "")
    this.loginService.logout()
  }

  public startTimer(): Date {
    const time = new Date()
    localStorage.setItem(LocalStorageWorker.timerKey, time.getTime().toString())
    this.timerService.startTimer()
    return time
  }

  public getTimer(): Date | null {
    const time = localStorage.getItem(LocalStorageWorker.timerKey)

    if (time) {
      return new Date(parseInt(time))
    }

    return null
  }

  public stopTimer(): Date | null {
    const time = localStorage.getItem(LocalStorageWorker.timerKey)
    localStorage.setItem(LocalStorageWorker.timerKey, '')
    this.timerService.stopTimer()

    if (time) {
      return new Date(parseInt(time))
    }

    return null
  }
}
