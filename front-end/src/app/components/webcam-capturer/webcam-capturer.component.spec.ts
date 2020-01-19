import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamCapturerComponent } from './webcam-capturer.component';

describe('WebcamCapturerComponent', () => {
  let component: WebcamCapturerComponent;
  let fixture: ComponentFixture<WebcamCapturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamCapturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamCapturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
