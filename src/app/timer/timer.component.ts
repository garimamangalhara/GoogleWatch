import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() {
    this.timerDisplay = {
      "hours": {
        "digit1": "0",
        "digit2": "0"
      },
      "minutes": {
        "digit1": "0",
        "digit2": "5"
      },
      "seconds": {
        "digit1": "0",
        "digit2": "0"
      }
    }
  }
  time = 300;
  isRunning = false;
  timerDisplay;
  ngOnInit() {
    timer(0, 1000).subscribe(ellapsedCycles => {
      if (this.isRunning && this.time != 0) {
        this.time--;
        this.timerDisplay = this.getDisplayTimer(this.time);
      }
    });
  }

  toggleTimer() {
    this.isRunning = !this.isRunning;
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
  resetTimer() {
    this.isRunning = false;
    this.time = 300;
    this.timerDisplay = this.getDisplayTimer(this.time);
  }

}
