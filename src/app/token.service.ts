import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login',
  };

  constructor() {}

  handleData(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
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

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
