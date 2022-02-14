import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserStateService } from './user-state.service';
import { AuthStateService } from './auth-state.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private authStateService: AuthStateService,
    private userStateService: UserStateService,
    private router: Router
  ) {}

  logIn(data: any) {
    this.localStorageService.handleData(data.access_token, data.user);
    this.authStateService.setAuthState(true);
    this.userStateService.setUserState(data.user);

    if (this.router.url == '/connect') {
      this.router.navigateByUrl('/profile');
    }
  }

  logOut() {
    this.localStorageService.clear();
    this.authStateService.setAuthState(false);
    this.userStateService.setUserState(null);

    if (this.router.url == '/profile') {
      this.router.navigateByUrl('/gallery');
    }
  }
}
