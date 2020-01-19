import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebcamCapturerComponent } from './components/webcam-capturer/webcam-capturer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ClassesPageComponent } from './classes-page/classes-page.component';
import { LecturesComponent } from './components/lectures/lectures.component';

import { ChartsModule } from 'ng2-charts';
import { ClassDetailsComponent } from './class-details/class-details.component';

@NgModule({
  declarations: [
    AppComponent,
    WebcamCapturerComponent,
    NavbarComponent,
    VideoPlayerComponent,
    ClassesPageComponent,
    LecturesComponent,
    ClassDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
