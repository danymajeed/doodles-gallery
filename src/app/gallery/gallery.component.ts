import { UserStateService } from '../user-state.service';
import { Component, OnInit } from '@angular/core';

export interface Doodle {
  id: number;
  image: string;
}

export interface Filters {
  search: string;
  addresses: Array<string>;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  doodles: Array<Doodle> = [];
  filters: Filters = { search: '', addresses: [] };
  loading: boolean = false;
  user: any = null;

  constructor(private userStateService: UserStateService) {}

  ngOnInit(): void {
    this.userStateService.user.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });

    this.doodles = [
      {
        id: 5693,
        image:
          'https://azk.imgix.net/images/ffac15a4-e063-4eaa-b93d-cdfd0604d02c.png?fm=jpg&amp;w=800',
      },
      {
        id: 4068,
        image:
          'https://azk.imgix.net/images/7be02308-adb3-4a7d-bbdf-ef8a358dcdab.png?fm=jpg&amp;w=800',
      },
      {
        id: 444,
        image:
          'https://azk.imgix.net/images/4c1143af-689d-42d3-ab64-aae5897f4dff.png?fm=jpg&amp;w=800',
      },
      {
        id: 5094,
        image:
          'https://azk.imgix.net/images/f1f47cb9-0a95-4d60-9339-dd1d2b11efa6.png?fm=jpg&amp;w=800',
      },
      {
        id: 5693,
        image:
          'https://azk.imgix.net/images/ffac15a4-e063-4eaa-b93d-cdfd0604d02c.png?fm=jpg&amp;w=800',
      },
      {
        id: 4068,
        image:
          'https://azk.imgix.net/images/7be02308-adb3-4a7d-bbdf-ef8a358dcdab.png?fm=jpg&amp;w=800',
      },
      {
        id: 444,
        image:
          'https://azk.imgix.net/images/4c1143af-689d-42d3-ab64-aae5897f4dff.png?fm=jpg&amp;w=800',
      },
      {
        id: 5094,
        image:
          'https://azk.imgix.net/images/f1f47cb9-0a95-4d60-9339-dd1d2b11efa6.png?fm=jpg&amp;w=800',
      },
      {
        id: 5693,
        image:
          'https://azk.imgix.net/images/ffac15a4-e063-4eaa-b93d-cdfd0604d02c.png?fm=jpg&amp;w=800',
      },
      {
        id: 4068,
        image:
          'https://azk.imgix.net/images/7be02308-adb3-4a7d-bbdf-ef8a358dcdab.png?fm=jpg&amp;w=800',
      },
      {
        id: 444,
        image:
          'https://azk.imgix.net/images/4c1143af-689d-42d3-ab64-aae5897f4dff.png?fm=jpg&amp;w=800',
      },
      {
        id: 5094,
        image:
          'https://azk.imgix.net/images/f1f47cb9-0a95-4d60-9339-dd1d2b11efa6.png?fm=jpg&amp;w=800',
      },
      {
        id: 5693,
        image:
          'https://azk.imgix.net/images/ffac15a4-e063-4eaa-b93d-cdfd0604d02c.png?fm=jpg&amp;w=800',
      },
      {
        id: 4068,
        image:
          'https://azk.imgix.net/images/7be02308-adb3-4a7d-bbdf-ef8a358dcdab.png?fm=jpg&amp;w=800',
      },
      {
        id: 444,
        image:
          'https://azk.imgix.net/images/4c1143af-689d-42d3-ab64-aae5897f4dff.png?fm=jpg&amp;w=800',
      },
      {
        id: 5094,
        image:
          'https://azk.imgix.net/images/f1f47cb9-0a95-4d60-9339-dd1d2b11efa6.png?fm=jpg&amp;w=800',
      },
      {
        id: 5693,
        image:
          'https://azk.imgix.net/images/ffac15a4-e063-4eaa-b93d-cdfd0604d02c.png?fm=jpg&amp;w=800',
      },
      {
        id: 4068,
        image:
          'https://azk.imgix.net/images/7be02308-adb3-4a7d-bbdf-ef8a358dcdab.png?fm=jpg&amp;w=800',
      },
      {
        id: 444,
        image:
          'https://azk.imgix.net/images/4c1143af-689d-42d3-ab64-aae5897f4dff.png?fm=jpg&amp;w=800',
      },
      {
        id: 5094,
        image:
          'https://azk.imgix.net/images/f1f47cb9-0a95-4d60-9339-dd1d2b11efa6.png?fm=jpg&amp;w=800',
      },
      {
        id: 5693,
        image:
          'https://azk.imgix.net/images/ffac15a4-e063-4eaa-b93d-cdfd0604d02c.png?fm=jpg&amp;w=800',
      },
      {
        id: 4068,
        image:
          'https://azk.imgix.net/images/7be02308-adb3-4a7d-bbdf-ef8a358dcdab.png?fm=jpg&amp;w=800',
      },
      {
        id: 444,
        image:
          'https://azk.imgix.net/images/4c1143af-689d-42d3-ab64-aae5897f4dff.png?fm=jpg&amp;w=800',
      },
      {
        id: 5094,
        image:
          'https://azk.imgix.net/images/f1f47cb9-0a95-4d60-9339-dd1d2b11efa6.png?fm=jpg&amp;w=800',
      },
    ];
  }

  refreshDoodles(fitlers: Filters) {}
}
