import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate(`300ms ease-out`)),
      transition(':leave', animate(`300ms ease-in`)),
    ]),
  ],
})
export class AppComponent {
  open = false;
  activeRoute = '/';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnInit() {}

  title = 'doodles';
}
