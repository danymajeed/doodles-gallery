import { Web3Service } from './web3.service';
import { environment } from './../environments/environment';
import { HttpCancelService } from './http-cancel.service';
import { HttpCancelInterceptor } from './http-cancel.interceptor';
import { MoralisService } from './moralis.service';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GalleryTypeFilterComponent } from './gallery/gallery-filters/gallery-type-filter/gallery-type-filter.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

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
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
      timeOut: 3000,
      easeTime: 200,
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: `${environment.apiUrl}/logs`,
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
  providers: [
    Web3Service,
    MoralisService,
    HttpCancelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCancelInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
