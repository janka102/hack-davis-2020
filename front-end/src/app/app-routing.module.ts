import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ClassesPageComponent } from './classes-page/classes-page.component';
import { ClassDetailsComponent } from './class-details/class-details.component';

const routes: Routes = [
  {
    path: "",
    component: ClassesPageComponent
  },
  {
    path: "class/:classId",
    component: ClassDetailsComponent
  },
  {
    path: "class/:classId/lecture/:lectureId",
    component: VideoPlayerComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
