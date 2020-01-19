import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrls: ['./classes-page.component.scss']
})
export class ClassesPageComponent implements OnInit {
  @Input() classes = [
    {
      code: "CS 101", 
      id: 'cs101',
      name: "Intro to Computer Science",
      color: '#E79295'
    },
    {
      code: "English 1", 
      id: 'eng1',
      name: "Lower Division Writing",
      color: '#9794E5'
    },
    {
      code: "Phys 130", 
      id: 'phys130',
      name: "Motion Physics",
      color: "#B693C2"
    }
]

@Input() lectures = [
  {
    course: "English 1", 
    name: "How to write using MLA format",
    date: "In 1 hour"
  },
  {
    course: "Phys 130", 
    name: "What is motion?",
    date: "Tomorrow at 9am"
  }
]
  constructor( private router: Router ) { }

  ngOnInit() {
  }

  goToLecture(){
    this.router.navigate(['class', 'cs101', 'lecture', '5e244178a76b43ad7d382223']);
  }

  goToClass(id){
    this.router.navigate(['class', id],{});
  }

}
