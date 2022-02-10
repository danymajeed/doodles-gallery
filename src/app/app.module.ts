import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryItemComponent } from './gallery/gallery-item/gallery-item.component';
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';
import { NavComponent } from './nav/nav.component';
import { GalleryFiltersComponent } from './gallery/gallery-filters/gallery-filters.component';
import { GallerySearchFilterComponent } from './gallery/gallery-filters/gallery-search-filter/gallery-search-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectComponent } from './connect/connect.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { GalleryTypeFilterComponent } from './gallery/gallery-filters/gallery-type-filter/gallery-type-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    PageNotFoundComponent,
    GalleryItemComponent,
    GalleryListComponent,
    NavComponent,
    GalleryFiltersComponent,
    GallerySearchFilterComponent,
    ConnectComponent,
    ProfileComponent,
    GalleryTypeFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
