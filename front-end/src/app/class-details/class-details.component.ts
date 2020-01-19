import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  classes = {
    cs101: {
      lectures: []
    },
    phys130: {
      
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
