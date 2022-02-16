import { LocalStorageService } from './../local-storage.service';
import { Doodle } from './../gallery/gallery.component';
import { ApiService } from './../api.service';
import { UserStateService } from './../user-state.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
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
      twitter_handle: [
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
      },
      error: (error) => {
        this.doodlesError = true;
      },
      complete: () => {
        this.doodlesLoading = false;
      },
    });
  }

  get twitterControl(): any {
    return this.profileForm.controls['twitter_handle'];
  }

  submit(profileForm: FormGroup) {
    this.updateUserLoading = true;
    this.updateUserError = false;
    this.apiService
      .updateUser(this.user.id, {
        twitter_handle: profileForm.controls['twitter_handle'].value,
      })
      .subscribe({
        next: (response) => {
          this.localStorageService.handleUser(response);
          this.userStateService.setUserState(response);
        },
        error: (error) => {
          if (error.error.validation_errors && error.status === 400) {
            const validationErrors = error.error.validation_errors;
            for (const input in validationErrors) {
              const err = this.profileForm.controls[input].errors || {};
              validationErrors[input].forEach((error: any) => {
                this.profileForm.controls[input].setErrors({
                  [error]: true,
                  ...err,
                });
              });
            }
          } else {
            this.toastr.error('', 'Failed To Update Profile', {
              toastClass: 'toast-error',
            });
          }
          this.updateUserError = true;
          this.updateUserLoading = false;
        },
        complete: () => {
          this.updateUserLoading = false;
        },
      });
  }
}
