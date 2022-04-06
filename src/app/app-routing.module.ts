import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/views/home/home.component";
import {HomeLoggedInComponent} from "./components/views/home-logged/home-logged-in/home-logged-in.component";
import {Observable} from "rxjs";
import {LocalStorageWorker} from "./classes/localstorage-worker/local-storage-worker.class";
import {LoginComponent} from "./components/views/login/login.component";
import {RegisterComponent} from "./components/views/register/register.component";
import {NotFoundComponent} from "./components/views/not-found/not-found.component";


@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin && !LocalStorageWorker.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    return true
  }
}

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AccessGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AccessGuard]},
  {path: 'home', component: HomeLoggedInComponent, data: {requiresLogin: true}, canActivate: [AccessGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AccessGuard]},
  {path: '**', component: NotFoundComponent, canActivate: [AccessGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AccessGuard],
  declarations: []
})
export class AppRoutingModule {
}
