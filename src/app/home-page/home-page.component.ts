import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() {
    this.timerDisplay = {
      "hours": {
        "digit1": "0",
        "digit2": "0"
      },
      "minutes": {
        "digit1": "0",
        "digit2": "0"
      },
      "seconds": {
        "digit1": "0",
        "digit2": "0"
      }
    }
  }

  time = 0;
  isRunning = false;
  timerDisplay;

  ngOnInit() {
    timer(0, 1000).subscribe(ellapsedCycles => {
      if (this.isRunning) {
        this.time++;
        this.timerDisplay = this.getDisplayTimer(this.time);
        console.log("Timer Object", this.timerDisplay);
      }
    });
  }

  toggleTimer() {
    this.isRunning = !this.isRunning;
  }

  resetWatch() {
    this.isRunning = false;
    this.time = 0;
    this.timerDisplay = this.getDisplayTimer(this.time);
  }

  getDisplayTimer(time: number) {
    const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time % 3600 / 60);
    const seconds = '0' + Math.floor(time % 3600 % 60);

    return {
      hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
      minutes: { digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1) },
      seconds: { digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1) },
    };
  }

}
