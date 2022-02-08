import { AuthGuard } from './auth.guard';
import { ConnectComponent } from './connect/connect.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'HomePage' },
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { animation: 'GalleryPage' },
  },
  {
    path: 'connect',
    component: ConnectComponent,
    canActivate: [AuthGuard],
    data: { animation: 'ConnectPage' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { animation: 'ProfilePage' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { animation: 'NotFoundPage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
