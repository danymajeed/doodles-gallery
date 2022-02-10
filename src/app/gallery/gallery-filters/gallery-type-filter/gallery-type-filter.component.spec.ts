import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryTypeFilterComponent } from './gallery-type-filter.component';

describe('GalleryTypeFilterComponent', () => {
  let component: GalleryTypeFilterComponent;
  let fixture: ComponentFixture<GalleryTypeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryTypeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
