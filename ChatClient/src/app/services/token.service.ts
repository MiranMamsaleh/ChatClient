import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }
  setToken(token: string) {
    this.deleteToken();
    localStorage.setItem('0', token);
  }

  getToken() {
    return localStorage.getItem('0');
  }

  deleteToken() {
    localStorage.removeItem('0');
  }
}
