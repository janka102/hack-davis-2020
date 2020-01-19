import { Component, OnInit, Input } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartPoint } from "chart.js";
import { Color, Label } from "ng2-charts";
import { DataService, Chat, Timestamp } from "../services/data.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-video-player",
  templateUrl: "./video-player.component.html",
  styleUrls: ["./video-player.component.scss"]
})
export class VideoPlayerComponent implements OnInit {
  @Input() course = "CS 101";
  @Input() courseInfo = "Intro to Computer Science";
  @Input() name;
  @Input() lectureVideo;
  text: string;

  chats: Chat[];
  users: any[];
  selectedUser: any = null;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: "Anger", pointRadius: 0 },
    { data: [], label: "Sorrow", pointRadius: 0 },
    { data: [], label: "Joy", pointRadius: 0 },
    { data: [], label: "Surprise", pointRadius: 0 }
  ];
  public lineChartOptions: ChartOptions = {
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "second"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 100
          }
        }
      ]
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
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataService.getChats("test").subscribe((chats: Chat[]) => {
      this.chats = chats.sort((a, b) => {
        const aTime = (a.time as Timestamp) || { seconds: Date.now() };
        const bTime = (b.time as Timestamp) || { seconds: Date.now() };
        return aTime.seconds - bTime.seconds;
      });
    });

    this.dataService
      .getLecture(this.route.snapshot.params.lectureId)
      .then(lecture => {
        this.name = lecture.name;
        this.lectureVideo = lecture.video;
      });

    this.dataService.getUsers().then(users => {
      this.users = users;
      this.selectedUser = users[0];
    });
  }

  async sendPicture(image: string) {
    const now = new Date();
    let time = 0;
    let reaction = await this.dataService.sendStudentPicture({
      user: "5e243115d38bde6a3aa167a7",
      lecture: "5e244178a76b43ad7d382225",
      image,
      time
    });
    console.log(reaction);
    if (!reaction.result) {
      // No face detected
      reaction.result = {
        anger: 0,
        sorrow: 0,
        joy: 0,
        surprise: 0
      };
    }

    const result = reaction.result;

    // Not sure why typescript complains about the type here, it works just fine!
    this.lineChartData[0].data.push({
      t: now,
      y: Math.floor(result.anger * 100)
    } as any);
    this.lineChartData[1].data.push({
      t: now,
      y: Math.floor(result.sorrow * 100)
    } as any);
    this.lineChartData[2].data.push({
      t: now,
      y: Math.floor(result.joy * 100)
    } as any);
    this.lineChartData[3].data.push({
      t: now,
      y: Math.floor(result.surprise * 100)
    } as any);

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
    this.text = "";
    await this.dataService.sendChat("test", "Jesse", text);
  }
}
