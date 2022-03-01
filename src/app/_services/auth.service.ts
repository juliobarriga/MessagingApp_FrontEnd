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

  public loginUser(userCredentials: UserCredentials){
    return this.http.post<string>(`${apiServerUrl}/auth/users/login`, userCredentials);
  }
}
