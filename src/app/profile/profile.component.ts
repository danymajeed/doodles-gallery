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
    private userStateService: UserStateService
  ) {}

  user: any = null;
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.userStateService.user.subscribe((user) => {
      this.user = user;
    });
    this.profileForm = this.fb.group({
      twitter: [
        this.user ? this.user.twitter : '',
        [Validators.required, Validators.pattern('^@[a-zA-Z0-9_]{3,15}$')],
      ],
    });
  }

  get twitterControl(): any {
    return this.profileForm.controls['twitter'];
  }

  submit(profileForm: FormGroup) {
    console.log(profileForm.controls['twitter']);
  }
}
