import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  public loginBehavior$ = this.loginBehavior.asObservable()

  constructor() {
  }

  public login() {
    this.loginBehavior.next(true)
  }

  public logout() {
    this.loginBehavior.next(true)
  }
}
