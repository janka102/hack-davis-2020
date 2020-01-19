import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  classId: string;
  classes = {
    cs101: {
      course: "CS 101",
      name: "Intro to Computer Science",
      upLectures: [
        {
          course: "CS 101",
          name: "Lecture 1.2 - Hello World",
          date: "Tomorrow at 9am"
        },
        {
          course: "CS 101",
          name: "Lecture 1.3 - If/Else Statements, For Loops",
          date: "Wednesday at 9am"
        }
      ],
      prevLectures: [
        {
          course: "CS 101",
          name: "Lecture 0 - Syllabus and Class Information",
          date: "Yesterday"
        }
      ]
    },
    phys130: {
      course: "Phys 130",
      name: "Motion Physics",
      upLectures: [
        {
          course: "Phys 130",
          name: "What is motion",
          date: "Tomorrow at 9am"
        },
      ],
      prevLectures: [
        {
          course: "Phys 130",
          name: "Syllabus review",
          date: "Two Days Ago"
        }
      ]
    },
    eng1: {
      course: "English 1",
      name: "Lower Division Writing",
      upLectures: [
        {
          course: "English 1",
          name: "How to write using MLA format",
          date: "In 1 hour"
        },
      ],
      prevLectures: [
        {
          course: "English 1",
          name: "Syllabus Review",
          date: "Two Days Ago"
        }
      ]
    }
  }

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private navbarService: NavbarService
    ) { }

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('classId');
    const myClass = this.classes[this.classId];
    this.navbarService.setClassName(myClass.course + ' - ' + myClass.name, this.classId);
  }
  goToLecture(){
    this.router.navigate(['class', 'cs101', 'lecture', '5e244178a76b43ad7d382223']);
  }

}
