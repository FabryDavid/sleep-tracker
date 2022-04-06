import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageWorker} from "../../../classes/localstorage-worker/local-storage-worker.class";
import {LoginService} from "../../../classes/login-service/login-service.Class";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public userLoggedIn = LocalStorageWorker.isLoggedIn()

  constructor(
    private router: Router
  ) {
    LoginService.loggedInEmitter.subscribe((value) => {
      this.userLoggedIn = value
    })
  }

  ngOnInit(): void {
  }

  logout() {
    LocalStorageWorker.logoutUser()
    this.userLoggedIn = LocalStorageWorker.isLoggedIn()
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    LoginService.loggedInEmitter.unsubscribe()
  }
}
