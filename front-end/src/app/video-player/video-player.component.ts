import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataService, Chat, Timestamp } from '../services/data.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() course = "CS 101";
  @Input() courseInfo = "Intro to Computer Science";
  @Input() name = "Lecture 1.1 - Getting Started in the Class";
  text: string;

  chats: Chat[];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Anger', pointRadius: 0 },
    { data: [], label: 'Sorrow', pointRadius: 0 },
    { data: [], label: 'Joy', pointRadius: 0 },
    { data: [], label: 'Surprise', pointRadius: 0 }
  ];
  public lineChartOptions: ChartOptions = {
    scales: {
      xAxes: [{
          type: 'time',
          time: {
              unit: 'minute'
          }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    },
    animation: {
      duration: 0
    }
  };

  public facePosition = {
    tilt: 0,
    pan: 0,
    roll: 0
  };

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getChats('test').subscribe((chats: Chat[]) => {
      this.chats = chats.sort((a, b) => {
        const aTime = (a.time as Timestamp) || { seconds: Date.now() };
        const bTime = (b.time as Timestamp) || { seconds: Date.now() };
        return aTime.seconds - bTime.seconds;
      });
    });
  }

  async sendPicture(image: string) {
    const now = new Date();
    let result = await this.dataService.sendStudentPicture(image);
    console.log(result);
    if (!result) {
      // No face detected
      result = {
        anger: 0,
        sorrow: 0,
        joy: 0,
        surprise: 0
      };
    }

    // Not sure why typescript complains about the type here, it works just fine!
    this.lineChartData[0].data.push({ t: now, y: Math.floor(result.anger * 100) } as any);
    this.lineChartData[1].data.push({ t: now, y: Math.floor(result.sorrow * 100) } as any);
    this.lineChartData[2].data.push({ t: now, y: Math.floor(result.joy * 100) } as any);
    this.lineChartData[3].data.push({ t: now, y: Math.floor(result.surprise * 100) } as any);

    for (const chartData of this.lineChartData) {
      chartData.data.sort((a, b) => a.t - b.t);

      // Only keep the last 30
      if (chartData.data.length > 30) {
        chartData.data = chartData.data.slice(-30);
      }
    }

    this.facePosition.tilt = Math.floor(result.tilt);
    this.facePosition.pan = Math.floor(result.pan);
    this.facePosition.roll = Math.floor(result.roll);
  }

  async sendChat(text: string) {
    this.text = '';
    await this.dataService.sendChat('test', 'Jesse', text);
  }

}
