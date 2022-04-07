import {Component, OnInit} from '@angular/core';
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../login/login.component";
import {SleepTime} from "../../../../classes/sleep-time/sleep-time.Class";
import {LocalStorageWorker} from "../../../../classes/localstorage-worker/local-storage-worker.class";
import {addSleepTime} from "../../../../services/sleep-time-service";

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.scss']
})
export class AddTimeComponent implements OnInit {
  timepickerTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#2c0f83',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#1F0664',
    },
    clockFace: {
      clockFaceBackgroundColor: '#1F0664',
      clockHandColor: '#F6573C',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  currentTime = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})

  startTimeFormControl = new FormControl('', [Validators.required]);
  wakeUpTimeFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  startTime = this.currentTime
  wakeupTime = this.currentTime

  constructor(
    private localStorageWorker: LocalStorageWorker
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit')

    const startTime = SleepTime.timeToDate(this.startTime)
    const wakeupTime = SleepTime.timeToDate(this.wakeupTime)
    const sleepTime = new SleepTime(startTime, wakeupTime, this.localStorageWorker.getCurrentUserId())

    addSleepTime(sleepTime).then((response) => {
      console.log(response)
    })
  }
}
