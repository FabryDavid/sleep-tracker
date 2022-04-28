import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../login/login.component";
import {User} from "../../../classes/user/user.Class";
import {LocalStorageWorker} from "../../../classes/localstorage-worker/local-storage-worker.class";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user = new User('', '')
  public alreadyRegistered = false

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private localStorageWorker: LocalStorageWorker,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.registerUser(this.user)
      .pipe(
        catchError((e: any) => {
          if (e.name === "AlreadyRegisteredError") {
            this.alreadyRegistered = true
          }
          return throwError(e);
        }),
      )
      .subscribe((data) => {
        console.log('sub')
        if (data) {
          this.localStorageWorker.loginUser(this.user)
          this.router.navigate(['/home'])
          // this.localStorageWorker.loginUser(data).then((response) => {
          //   if (response) {
          //     this.router.navigate(['/home'])
          //   }
          // })
        }
      })

    // registerUser(this.user).then((response) => {
    //   if (response) {
    //     this.localStorageWorker.loginUser(response).then((response) => {
    //       if (response) {
    //         this.router.navigate(['/home'])
    //       }
    //     })
    //   }
    // }).catch((e: Error) => {
    //   if (e.name === "AlreadyRegisteredError") {
    //     this.alreadyRegistered = true
    //   }
    // })
  }
}
