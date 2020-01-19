import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface Breadcrumbs {
  currentClass: string;
  currentClassId: string;
  currentLecture: string;
  showClass: boolean;
  showLecture: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService implements OnDestroy {
  data: Breadcrumbs = {
    currentClass: '',
    currentClassId: '',
    currentLecture: '',
    showClass: false,
    showLecture: false
  };
  breadcrumbs$ = new BehaviorSubject<Breadcrumbs>(this.data);
  sub: Subscription;

  constructor(private router: Router) { }

  start() {
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.startsWith('/class')) {
          this.data.showClass = true;
        } else {
          this.data.showClass = false;
        }

        if (event.url.includes('/lecture')) {
          this.data.showLecture = true;
        } else {
          this.data.showLecture = false;
        }
      }
      this.breadcrumbs$.next(this.data);
    });
  }

  setClassName(name: string, id: string) {
    this.data.currentClass = name;
    this.data.currentClassId = id;
    this.breadcrumbs$.next(this.data);
  }

  setLectureName(name: string) {
    this.data.currentLecture = name;
    this.breadcrumbs$.next(this.data);
  }

  getBreadcrumbs$() {
    return this.breadcrumbs$.asObservable();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
