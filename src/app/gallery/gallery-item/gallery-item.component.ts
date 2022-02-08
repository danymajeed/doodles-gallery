import { Doodle } from './../gallery.component';
import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate(`300ms ease-out`)),
    ]),
  ],
})
export class GalleryItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  doodle!: Doodle;
}
