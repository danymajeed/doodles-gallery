import { ApiService } from './../api.service';
import { UserStateService } from '../user-state.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export interface Doodle {
  id: number;
  name: string;
  image: string;
}

export interface Filters {
  search: string;
  type: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate(`100ms ease-out`)),
    ]),
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate(`100ms ease-out`)),
      transition(':leave', animate(`50ms ease-in`)),
    ]),
  ],
})
export class GalleryComponent implements OnInit {
  doodles: Array<Doodle> = [];
  filters: Filters = { search: '', type: 'all' };
  loading: boolean = false;
  error: boolean = false;
  user: any = null;
  isFinished = false;
  currentPage = 0;
  count = 0;

  constructor(
    private userStateService: UserStateService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userStateService.user.subscribe((user) => {
      this.user = user;
    });

    this.getDoodles();
  }

  refreshDoodles(filters: Filters) {
    this.currentPage = 0;
    this.isFinished = false;
    this.doodles = [];
    this.count = 0;
    this.getDoodles();
  }

  onScroll() {
    this.getDoodles();
  }

  getDoodles() {
    if (this.isFinished) return;

    this.loading = true;
    this.error = false;
    this.currentPage += 1;
    this.apiService
      .getDoodles(
        this.currentPage,
        12,
        this.filters,
        this.user ? this.user.public_address : ''
      )
      .subscribe({
        next: (response) => {
          if (!response.doodles.length) this.isFinished = true;
          else this.doodles = this.doodles.concat(response.doodles);
          this.count = response.count;
          this.loading = false;
        },
        error: (error) => {
          this.error = true;
          this.loading = false;
          this.count = 0;
          console.log(error);
        },
        complete: () => {},
      });
  }
}
