import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      
    }
  }

  constructor(
    private route : ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('classId');
  }
  goToLecture(){
    this.router.navigate(['class', 'cs101', 'lecture', '5e244178a76b43ad7d382223']);
  }

}
