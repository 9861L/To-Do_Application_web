import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USER } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  //loginUsers : set token in localStorage
  public setToken(jwtToken: any) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  getToken(){
    return localStorage.getItem('jwtToken');
  }

  //isLoggedIn : user is login or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('jwtToken');
    return tokenStr == undefined || tokenStr == '' || tokenStr == null ? false : true;
  }

  //logout : remove token from the local storage
  public logout() {        
    localStorage.removeItem('jwtToken');
    return true;
  }

  //set current user in local storage
  setUser(user: any) {
    return localStorage.setItem('user', JSON.stringify(user));
  }
  
  //get current user in local storage
  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }
  public loginUser(user: any): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:9005/user/loginUser',
      user
    );
  }
  public registerUser(user: USER): Observable<USER> {
    return this.httpClient.post<USER>(
      'http://localhost:9005/toDo/register',
      user
    );
  }
}
