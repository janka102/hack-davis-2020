import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-webcam-capturer',
  templateUrl: './webcam-capturer.component.html',
  styleUrls: ['./webcam-capturer.component.scss']
})
export class WebcamCapturerComponent implements OnInit, OnDestroy {
  @Input() captureInterval = 1000;
  @Input() width = 200;
  height = 0;

  @ViewChild('webcam', { static: true }) private webcamElement: ElementRef;
  @ViewChild('result', { static: true }) private resultElement: ElementRef;
  private webcam: HTMLVideoElement;
  private result: HTMLCanvasElement;
  private captureSub: Subscription;

  @Output() image = new EventEmitter<string>();

  constructor() { }

  async ngOnInit() {
    // Get the video element.
    this.webcam = this.webcamElement.nativeElement;
    this.result = this.resultElement.nativeElement;

    // Make the video element stream from webcam.
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    this.webcam.srcObject = stream;
    this.webcam.play();

    // Wait for stream to play before setting height.
    await this.waitStreamToPlay();
    this.height = this.webcam.videoHeight / (this.webcam.videoWidth / this.width);

    // Call function every interval.
    const intervalObs = interval(this.captureInterval);
    this.captureSub = intervalObs.subscribe(() => this.takeFrame());
  }

  takeFrame() {
    // Draw webcam frame to canvas.
    const context = this.result.getContext('2d');
    context.drawImage(this.webcam, 0, 0, this.width, this.height);

    // Convert canvas to data URL.
    const data = this.result.toDataURL('image/png');
    this.image.emit(data);
  }

  waitStreamToPlay() {
    return new Promise((resolve) => {
      const streamPlayed = () => {
        this.webcam.removeEventListener('canplay', streamPlayed);
        resolve();
      };
      this.webcam.addEventListener('canplay', streamPlayed);
    });
  }

  ngOnDestroy() {
    if (this.captureSub) {
      this.captureSub.unsubscribe();
    }
  }

}
