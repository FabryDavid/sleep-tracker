import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageWorker} from "../../../classes/localstorage-worker/local-storage-worker.class";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login-service/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public userLoggedIn = this.localStorageWorker.isLoggedIn()

  private subscribe: Subscription | undefined

  constructor(
    private router: Router,
    private localStorageWorker: LocalStorageWorker,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.subscribe = this.loginService.loginBehavior$.subscribe(_ => {
      this.userLoggedIn = this.localStorageWorker.isLoggedIn()
    })
  }

  logout() {
    this.localStorageWorker.logoutUser()
    this.userLoggedIn = this.localStorageWorker.isLoggedIn()
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }
}
