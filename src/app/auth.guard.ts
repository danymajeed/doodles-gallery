import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private connect: UrlTree;
  private profile: UrlTree;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.connect = this.router.parseUrl('connect');
    this.profile = this.router.parseUrl('profile');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.localStorageService.isLoggedIn()) {
      if (state.url === '/connect') {
        return this.profile;
      } else {
        return true;
      }
    } else {
      if (state.url === '/connect') {
        return true;
      } else {
        return this.connect;
      }
    }
  }
}
