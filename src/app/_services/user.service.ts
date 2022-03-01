import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../_models/message';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServerUrl = 'https://messagingapp--api.herokuapp.com';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }


  public getAllMessages(): Observable<Message[]> {
    let tokenStr = 'Bearer ' + this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Message[]>(`${this.apiServerUrl}/api/messages`,{headers, responseType: 'text' as 'json'});
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
