import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {LocalStorageWorker} from "../../../classes/localstorage-worker/local-storage-worker.class";
import {User} from "../../../classes/user/user.Class";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login-service/login.service";
import {UserService} from "../../../services/user.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user = new User('', '')
  public incorrectPassword = false

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private localStorageWorker: LocalStorageWorker,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.getUserByEmail(this.user.email).subscribe((data) => {
      if (data && data.length === 1) {
        const u = data[0]
        console.log(u)
        console.log(this.user)
        if (u.email === this.user.email && u.password === this.user.password) {
          this.localStorageWorker.loginUser(u)
          this.router.navigate(['/home'])
          return;
        }
      }

      this.incorrectPassword = true
      this.localStorageWorker.logoutUser()
    })
  }
}
