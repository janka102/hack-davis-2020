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
  @Input() lectureNumber;
  @Input() lectureTitle;
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
      }]
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
    const result = await this.dataService.sendStudentPicture(image);
    console.log(result);
    if (result) {
      this.lineChartData[0].data.push(<any>{ t: now, y: (result.anger * 100) | 0 });
      this.lineChartData[1].data.push(<any>{ t: now, y: (result.sorrow * 100) | 0 });
      this.lineChartData[2].data.push(<any>{ t: now, y: (result.joy * 100) | 0 });
      this.lineChartData[3].data.push(<any>{ t: now, y: (result.surprise * 100) | 0 });

      this.lineChartData[0].data.sort((a, b) => a.t - b.t);
      this.lineChartData[1].data.sort((a, b) => a.t - b.t);
      this.lineChartData[2].data.sort((a, b) => a.t - b.t);
      this.lineChartData[3].data.sort((a, b) => a.t - b.t);

      this.facePosition.tilt = result.tilt | 0;
      this.facePosition.pan = result.pan | 0;
      this.facePosition.roll = result.roll | 0;
    }
  }

  async sendChat(text: string) {
    this.text = '';
    await this.dataService.sendChat('test', 'Jesse', text);
  }

}
