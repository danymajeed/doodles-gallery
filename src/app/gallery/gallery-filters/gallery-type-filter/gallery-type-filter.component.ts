import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery-type-filter',
  templateUrl: './gallery-type-filter.component.html',
  styleUrls: ['./gallery-type-filter.component.scss'],
})
export class GalleryTypeFilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  type: string = 'all';

  @Input()
  user: any = null;

  @Output() typeUpdateEvent = new EventEmitter<string>();

  updateType(value: any) {
    this.typeUpdateEvent.emit(value);
  }
}
