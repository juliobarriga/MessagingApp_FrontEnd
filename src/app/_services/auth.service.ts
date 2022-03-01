import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { UserCredentials } from '../_models/userCredentials';
const apiServerUrl = 'https://messagingapp--api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public loginUser(userCredentials: UserCredentials): Observable<any> {
    return this.http.post<UserCredentials>(`${apiServerUrl}/auth/users/login`, userCredentials).pipe(shareReplay());
  }
}
