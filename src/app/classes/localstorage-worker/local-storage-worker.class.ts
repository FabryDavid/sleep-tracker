import {IUser} from "../../interfaces/iuser.Interface";
import {TimerService} from "../../services/timer-service/timer.service";
import {Injectable} from "@angular/core";
import {LoginService} from "../../services/login-service/login.service";
import {UserService} from "../../services/user.service";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageWorker {
  static loggedInUserKey = "loggedInUserId"
  static timerKey = "timerStartTime"

  constructor(
    private loginService: LoginService,
    private timerService: TimerService,
    private userService: UserService
  ) {
  }

  public getCurrentUserId(): string | null {
    return localStorage.getItem(LocalStorageWorker.loggedInUserKey)
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUserId()
  }

  public async loginUser(user: IUser) {
    localStorage.setItem(LocalStorageWorker.loggedInUserKey, user.id)
    this.loginService.login();
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
