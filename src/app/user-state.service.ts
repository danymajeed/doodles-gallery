import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userState = new BehaviorSubject<any>(
    this.localStorageService.getUser()
  );

  user = this.userState.asObservable();

  constructor(public localStorageService: LocalStorageService) {}

  setUserState(value: any) {
    this.userState.next(value);
  }
}
