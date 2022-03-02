import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../_models/message';
import { User } from '../_models/user';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServerUrl = 'https://messagingapp--api.herokuapp.com';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  public getUserInfo(): Observable<User> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<User>(`${this.apiServerUrl}/api/user`,{headers});
  }

  public getAllMessages(): Observable<Message[]> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Message[]>(`${this.apiServerUrl}/api/messages`,{headers});
  }

  public getAllUsers(): Observable<User[]> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<User[]>(`${this.apiServerUrl}/api/users`,{headers});
  }

  public getMessagesByReceiverId(receiverId:number): Observable<Message[]> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Message[]>(`${this.apiServerUrl}/api/messages/sent/${receiverId}`,{headers});
  }

  public getMessagesBySenderId(senderId:number): Observable<Message[]> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Message[]>(`${this.apiServerUrl}/api/messages/received/${senderId}`,{headers});
  }

  public getSharedMessages(secondUserId:number): Observable<Message[]> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Message[]>(`${this.apiServerUrl}/api/messages/shared/${secondUserId}`,{headers});
  }

  public createMessageByReceiverId(receiverId:number, message:any): Observable<Message> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    console.log("this is the message",message);
    return this.http.post<any>(`${this.apiServerUrl}/api/messages/${receiverId}`,message,{headers});
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
  // }
}
