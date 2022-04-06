import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../login/login.component";
import {User} from "../../../classes/user/user.Class";
import {LocalStorageWorker} from "../../../classes/localstorage-worker/local-storage-worker.class";
import {registerUser} from "../../../services/userService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user = new User('', '' )

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  matcher = new MyErrorStateMatcher();


  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    registerUser(this.user).then((response) => {
      if (response) {
        LocalStorageWorker.loginUser(response).then((response) => {
          if(response){
            this.router.navigate(['/home'])
          }
        })
      }
    })
  }
}
