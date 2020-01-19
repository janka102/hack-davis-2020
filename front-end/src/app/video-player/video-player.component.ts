import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartPoint } from "chart.js";
import { Color, Label } from "ng2-charts";
import { DataService, Chat, Timestamp } from "../services/data.service";
import { NavbarService } from '../navbar.service';
import { Router, ActivatedRoute } from "@angular/router";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-video-player",
  templateUrl: "./video-player.component.html",
  styleUrls: ["./video-player.component.scss"]
})
export class VideoPlayerComponent implements OnInit {
  @Input() course = "CS 101";
  @Input() courseInfo = "Intro to Computer Science";
  @Input() name;
  @Input() lectureVideoSrc;
  @Input() pollInterval = 1000;
  private pollSub: Subscription;

  @ViewChild("lecvid", { static: true })
  private lecvidElement: ElementRef;
  private lecvid: HTMLVideoElement;

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
      // xAxes: [
      //   {
      //     type: "time",
      //     time: {
      //       unit: "second"
      //     }
      //   }
      // ],
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

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private navbarService: NavbarService
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
        this.navbarService.setClassName('CS 101 - Intro to Computer Science', 'cs101');
        this.navbarService.setLectureName(this.name);
        this.lectureVideoSrc = lecture.video;
      });

    this.dataService.getUsers().then(users => {
      this.users = users;
      this.selectedUser = users[0];
    });

    this.lecvid = this.lecvidElement.nativeElement;
    const intervalPoll = interval(this.pollInterval);
    this.pollSub = intervalPoll.subscribe(() => this.pollReactions());
  }

  pollReactions() {
    if (this.selectedUser.role !== "professor") {
      return;
    }

    const lecture = this.route.snapshot.params.lectureId;
    const time = Math.floor(this.lecvid.currentTime);

    this.dataService.getReactions(lecture, time).then(reactions => {
      this.lineChartData[0].data = reactions.map(r => ({
        x: r.time,
        y: Math.floor(r.anger * 100)
      }));
      this.lineChartData[1].data = reactions.map(r => ({
        x: r.time,
        y: Math.floor(r.sorrow * 100)
      }));
      this.lineChartData[2].data = reactions.map(r => ({
        x: r.time,
        y: Math.floor(r.joy * 100)
      }));
      this.lineChartData[3].data = reactions.map(r => ({
        x: r.time,
        y: Math.floor(r.surprise * 100)
      }));
    });
  }

  // userChanged($event) {
  //   if (this.selectedUser.role === "professor") {
  //     this.lecvid = this.lecvidElement.nativeElement;
  //   }
  // }

  async sendPicture(image: string) {
    let time = Math.floor(this.lecvid.currentTime);

    if (time > 0) {
      await this.dataService.sendStudentPicture({
        user: this.selectedUser._id,
        lecture: this.route.snapshot.params.lectureId,
        image,
        time
      });
    }
  }

  async sendChat(text: string) {
    this.text = "";
    await this.dataService.sendChat("test", this.selectedUser.name, text);
  }

  ngOnDestroy() {
    if (this.pollSub) {
      this.pollSub.unsubscribe();
    }
  }
}
