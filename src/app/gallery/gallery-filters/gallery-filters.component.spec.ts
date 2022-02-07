import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFiltersComponent } from './gallery-filters.component';

describe('GalleryFiltersComponent', () => {
  let component: GalleryFiltersComponent;
  let fixture: ComponentFixture<GalleryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
