import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { firestore } from 'firebase';

export type Timestamp = firestore.Timestamp;

export interface Chat {
  user: string;
  text: string;
  time: Timestamp | firestore.FieldValue;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private db: AngularFirestore
  ) { }

  async sendStudentPicture(image: string) {
    const result = (await this.http.post(`${environment.serverUrl}/users/faceDetect`, {
      camera: image
    }).toPromise()) as {[x: string]: number} | null;
    return result;
  }

  async getCourses() {
    const result = (await this.http.get(`${environment.serverUrl}/courses/`).toPromise()) as {[x: string]: any}[];
    return result;
  }

  async getCourse(id: string) {
    const result = (await this.http.get(`${environment.serverUrl}/courses/${id}`).toPromise()) as {[x: string]: any}[];
    return result;
  }

  async getLectures() {
    const result = (await this.http.get(`${environment.serverUrl}/lectures/`).toPromise()) as {[x: string]: any}[];
    return result;
  }

  async getLecture(id: string) {
    const result = (await this.http.get(`${environment.serverUrl}/lectures/${id}`).toPromise()) as {[x: string]: any}[];
    return result;
  }

  async getReactions(user, lecture) {
    const query = [];

    if (user) {
      query.push(`user=${user}`);
    }

    if (lecture) {
      query.push(`lecture=${lecture}`);
    }

    const result = (await this.http.get(`${environment.serverUrl}/reaction/?${query.join('&')}`).toPromise()) as {[x: string]: any}[];
    return result;
  }

  async getReaction(id: string) {
    const result = (await this.http.get(`${environment.serverUrl}/reaction/${id}`).toPromise()) as {[x: string]: any}[];
    return result;
  }

  async getUsers() {
    const result = (await this.http.get(`${environment.serverUrl}/users/`).toPromise()) as {[x: string]: any}[];
    return result;
  }

  getChats(id: string) {
    return this.db.collection(`chatrooms/${id}/chats`).valueChanges();
  }

  sendChat(chatroom: string, user: string, text: string) {
    const chatId = this.db.createId();
    const chat: Chat = {
      user,
      text,
      time: firestore.FieldValue.serverTimestamp()
    };

    return this.db.doc(`chatrooms/${chatroom}/chats/${chatId}`).set(chat);
  }
}
