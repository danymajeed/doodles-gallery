import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySearchFilterComponent } from './gallery-search-filter.component';

describe('GallerySearchFilterComponent', () => {
  let component: GallerySearchFilterComponent;
  let fixture: ComponentFixture<GallerySearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerySearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
