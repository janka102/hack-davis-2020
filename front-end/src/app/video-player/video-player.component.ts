import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() course = "CS 101";
  @Input() courseInfo = "Intro to Computer Science";
  @Input() name = "Lecture 1.1 - Getting Started in the Class";
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  async sendPicture(image: string){
    const result = await this.dataService.sendStudentPicture(image);
    console.log(result);
  }

}
