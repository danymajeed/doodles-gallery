import { Component, Input, OnInit } from '@angular/core';
import { Doodle } from '../gallery.component';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss'],
})
export class GalleryListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  doodles: Array<Doodle> = [];
}
