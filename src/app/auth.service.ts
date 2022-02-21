import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserStateService } from './user-state.service';
import { AuthStateService } from './auth-state.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private authStateService: AuthStateService,
    private userStateService: UserStateService,
    private apiService: ApiService,
    private router: Router,
    private zone: NgZone
  ) {}

  logIn(data: any): Observable<any> {
    return this.apiService.logIn(data).pipe(
      map((res: any) => {
        this.zone.run(() => {
          this.localStorageService.handleToken(res.access_token);
          this.localStorageService.handleUser(res.user);
          this.userStateService.setUserState(res.user);
          this.authStateService.setAuthState(true);
          if (this.router.url == '/connect') {
            this.router.navigateByUrl('/profile');
          }
        });
        return res;
      })
    );
  }

  logOut() {
    this.zone.run(() => {
      this.localStorageService.clear();
      this.authStateService.setAuthState(false);
      this.userStateService.setUserState(null);

      if (this.router.url == '/profile') {
        this.router.navigateByUrl('/gallery');
      }
    });
  }
}
