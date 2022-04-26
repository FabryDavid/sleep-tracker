import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {HomeComponent} from './components/views/home/home.component';
import {HomeLoggedInComponent} from './components/views/home-logged/home-logged-in/home-logged-in.component';
import {LoginComponent} from './components/views/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegisterComponent} from './components/views/register/register.component';
import {PasswordStrength} from "./pipes/password-strength.Pipe";
import axios from 'axios';
import {NotFoundComponent} from './components/views/not-found/not-found.component';
import {TimerComponent} from './components/views/home-logged/timer/timer.component';
import {AddTimeComponent} from './components/views/home-logged/add-time/add-time.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {SleepTime} from "./pipes/sleep-time.Pipe";
import {SleepTimesComponent} from './components/views/home-logged/sleep-times/sleep-times.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {SleepTimePanelComponent} from './components/views/home-logged/sleep-time-panel/sleep-time-panel.component';
import {HttpClientModule} from "@angular/common/http";
import {AvgSleepPanelComponent} from './components/views/home-logged/avg-sleep-panel/avg-sleep-panel.component';
import {TotalSleepPanelComponent} from './components/views/home-logged/total-sleep-panel/total-sleep-panel.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HomeLoggedInComponent,
    LoginComponent,
    RegisterComponent,
    PasswordStrength,
    NotFoundComponent,
    TimerComponent,
    AddTimeComponent,
    SleepTime,
    SleepTimesComponent,
    SleepTimePanelComponent,
    AvgSleepPanelComponent,
    TotalSleepPanelComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NgxMaterialTimepickerModule,
        MatExpansionModule,
        HttpClientModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatPaginatorModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    axios.defaults.baseURL = "http://localhost:3000"
  }
}
