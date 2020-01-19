import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() lectureNumber;
  @Input() lectureTitle;
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
