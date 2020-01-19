import { Component, OnInit, Input } from '@angular/core';
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
    const result = await this.dataService.sendStudentPicture(image);
    console.log(result);
  }

  async sendChat(text: string) {
    this.text = '';
    await this.dataService.sendChat('test', 'Jesse', text);
  }

}
