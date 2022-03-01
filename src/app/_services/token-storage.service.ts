import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  logout(): void {
    window.sessionStorage.clear();
    window.sessionStorage.setItem('isLoggedIn', JSON.stringify(false));
  }

  setToken(token:string):void {
    window.sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
    window.sessionStorage.setItem('jwt', token);
  }

  getToken():any {
    return window.sessionStorage.getItem('jwt');
  }

  getLoginStatus():boolean {
    console.log(typeof window.sessionStorage.getItem('isLoggedIn'));
    return window.sessionStorage.getItem('isLoggedIn') == "true";
  }

  setUserInfo(user: User): any {
    window.sessionStorage.setItem('id', JSON.stringify(user.id));
    window.sessionStorage.setItem('phoneNumber', JSON.stringify(user.phoneNumber));
    window.sessionStorage.setItem('userName', JSON.stringify(user.userName));
    window.sessionStorage.setItem('birthDate', JSON.stringify(user.birthDate));
  }


}
