import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userState = new BehaviorSubject<boolean>(
    this.localStorageService.isLoggedIn()
  );
  userAuthState = this.userState.asObservable();

  constructor(public localStorageService: LocalStorageService) {}

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}
