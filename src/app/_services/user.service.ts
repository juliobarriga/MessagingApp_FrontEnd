import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServerUrl = 'https://messagingapp--api.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getAllMessages(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/messages`);
  }

  // public createMessagesByReceiverId(): Observable<any> {
  //   return this.http.get(`${this.apiServerUrl}/api/messages`);
  // }

  // public getMessagesByReceiverId(): Observable<any> {
  //   return this.http.get(`${this.apiServerUrl}/api/messages`);
  // }

  // public updateMessage(): Observable<any> {
  //   return this.http.get(`${this.apiServerUrl}/api/messages`);
  // }

  // public deleteMessage(): Observable<any> {
  //   return this.http.get(`${this.apiServerUrl}/api/messages`);
  }
}
