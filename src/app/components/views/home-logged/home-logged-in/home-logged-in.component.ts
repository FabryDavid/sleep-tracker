import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-logged-in',
  templateUrl: './home-logged-in.component.html',
  styleUrls: ['./home-logged-in.component.scss']
})
export class HomeLoggedInComponent implements OnInit {
  timeFilter?: string = "sevenDays"

  constructor() {
  }

  ngOnInit(): void {
  }

}
