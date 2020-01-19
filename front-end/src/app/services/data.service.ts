import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  async sendStudentPicture(image: string) {
    const result = await this.http.post(`${environment.serverUrl}/student/faceDetect`, {
      camera: image
    }).toPromise();
    return result;
  }
}
