import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class UserService {

  isLoged: boolean = false;
  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  checkPassword(_userName, _password){
    return this.http.post(this.url + "/user/login", {userName: _userName, password: _password})
  }
}
