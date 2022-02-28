import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { UserCredentials } from '../_models/userCredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiServerUrl = 'https://messagingapp--api.herokuapp.com';

  constructor(private http: HttpClient) { }

  public loginUser(userCredentials: UserCredentials): any {
    return this.http.post<UserCredentials>(`${this.apiServerUrl}/auth/users/login`, userCredentials).pipe(shareReplay());
  }
}
