import { Filters } from './../gallery.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery-filters',
  templateUrl: './gallery-filters.component.html',
  styleUrls: ['./gallery-filters.component.scss'],
})
export class GalleryFiltersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  filters!: Filters;

  @Input()
  disabled: boolean = false;

  @Output()
  filtersChangeEvent = new EventEmitter<Filters>();

  updateSearch(value: string) {
    if (this.filters.search === value) return;

    this.filters.search = value;
    this.filtersChangeEvent.emit(this.filters);
  }
}
