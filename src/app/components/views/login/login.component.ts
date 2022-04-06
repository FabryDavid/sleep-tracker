import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {LocalStorageWorker} from "../../../classes/localstorage-worker/local-storage-worker.class";
import {User} from "../../../classes/user/user.Class";
import {Router} from "@angular/router";

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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    LocalStorageWorker.loginUser(this.user).then((response) => {
      if (response) {
        this.router.navigate(['/home'])
      }
    })
  }
}
