import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  apiServerUrl = 'https://messagingapp--api.herokuapp.com';

  constructor(private http: HttpClient) { }

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/auth/users/register`, user);
  }

  //loginUser
  //getAllMessages
  //createMessageByReceiverId
  //getMessagesByReceiverId
  //updateMessage
  //deleteMessage
}
