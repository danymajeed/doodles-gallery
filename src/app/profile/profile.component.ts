import { LocalStorageService } from './../local-storage.service';
import { Doodle } from './../gallery/gallery.component';
import { ApiService } from './../api.service';
import { UserStateService } from './../user-state.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userStateService: UserStateService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) {}

  user: any = null;
  doodles: Array<Doodle> = [];
  doodlesLoading: boolean = false;
  doodlesError: boolean = false;
  updateUserLoading: boolean = false;
  updateUserError: boolean = false;
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.userStateService.user.subscribe((user) => {
      this.user = user;
    });

    this.getUserDoodles();

    this.profileForm = this.fb.group({
      twitter: [
        this.user ? this.user.twitter_handle : '',
        [Validators.required, Validators.pattern('^@[a-zA-Z0-9_]{3,15}$')],
      ],
    });
  }

  getUserDoodles() {
    this.doodlesLoading = true;
    this.doodlesError = false;
    this.apiService.getUserDoodles().subscribe({
      next: (response) => {
        this.doodles = response.doodles;
        console.log(response);
      },
      error: (error) => {
        this.doodlesError = true;
        console.log(error);
      },
      complete: () => {
        this.doodlesLoading = false;
      },
    });
  }

  get twitterControl(): any {
    return this.profileForm.controls['twitter'];
  }

  submit(profileForm: FormGroup) {
    this.updateUserLoading = true;
    this.updateUserError = false;
    this.apiService
      .updateUser(this.user.id, {
        twitter_handle: profileForm.controls['twitter'].value,
      })
      .subscribe({
        next: (response) => {
          this.localStorageService.handleUser(response);
          this.userStateService.setUserState(response);
        },
        error: (error) => {
          this.updateUserError = true;
        },
        complete: () => {
          this.updateUserLoading = false;
        },
      });
  }
}
