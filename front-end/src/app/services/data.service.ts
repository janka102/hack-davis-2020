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
    const result = <{[x:string]: number} | null>(await this.http.post(`${environment.serverUrl}/student/faceDetect`, {
      camera: image
    }).toPromise());
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
