import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit {
  @Input() lecture;
  constructor() { }

  ngOnInit() {
  }

}
