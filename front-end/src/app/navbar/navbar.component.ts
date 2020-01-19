import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() appName;
  @Input() className = 'CS 101';
  @Input() classDescription = 'Intro to Computer Science';
  showClass = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.startsWith('/class')) {
          this.showClass = true;
        } else {
          this.showClass = false;
        }
      }
    });
  }

}
