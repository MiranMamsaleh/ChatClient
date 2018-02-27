import { RegisterDto } from './../data-transfer-objects/register-dto';
import { LoginDto } from './../data-transfer-objects/login-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/auth';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient) { }

  userLogin(username: string, password: string) {
    return this.http.post<Response>('https://peaceful-ridge-95928.herokuapp.com/login', new LoginDto(username, password));
  }

  userRegister(username: string, password: string, repassword: string) {
    return this.http.post<Response>('https://peaceful-ridge-95928.herokuapp.com/register', new RegisterDto(username, password, repassword));
  }

}
