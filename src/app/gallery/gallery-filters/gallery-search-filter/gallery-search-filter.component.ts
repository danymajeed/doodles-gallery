import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery-search-filter',
  templateUrl: './gallery-search-filter.component.html',
  styleUrls: ['./gallery-search-filter.component.scss'],
})
export class GallerySearchFilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  timer: any;

  @Input()
  search: string = '';

  @Output() searchUpdateEvent = new EventEmitter<string>();

  updateSearch(searchControl: any) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.searchUpdateEvent.emit(searchControl.value);
    }, 500);
  }
}
