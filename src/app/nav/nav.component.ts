import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate(`300ms ease-out`)),
      transition(':leave', animate(`300ms ease-in`)),
    ]),
  ],
})
export class NavComponent implements OnInit {
  constructor() {}
  mobileNavOpen = false;

  ngOnInit(): void {}

  @Input()
  activeRoute = '/';
}
