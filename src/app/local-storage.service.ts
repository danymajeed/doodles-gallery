import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login',
  };

  constructor() {}

  handleToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  handleUser(User: any) {
    localStorage.setItem('user', JSON.stringify(User));
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  getUser() {
    var user = localStorage.getItem('user');
    return user && JSON.parse(user);
  }

  // Verify the token
  isValidToken(): boolean {
    const token = this.getToken();
    let jwtHelper: JwtHelperService = new JwtHelperService();

    if (token && !jwtHelper.isTokenExpired(token)) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
      return false;
    } else {
      return false;
    }
  }

  payload(token: string) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  clear() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}
