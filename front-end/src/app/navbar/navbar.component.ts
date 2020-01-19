import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NavbarService, Breadcrumbs } from '../navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() appName;
  data: Breadcrumbs = {
    currentClass: '',
    currentClassId: '',
    currentLecture: '',
    showClass: false,
    showLecture: false
  };
  sub: Subscription;

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.start();
    this.sub = this.navbarService.getBreadcrumbs$().subscribe((breadcrumbs => {
      this.data = breadcrumbs;
    }));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
