import { AuthStateService } from './auth-state.service';
import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { Component, NgZone } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { fader } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader],
})
export class AppComponent {
  activeRoute = '/';
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authStateService: AuthStateService,
    private apiService: ApiService,
    private zone: NgZone
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnInit() {
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: Array<string>) => {
        if (accounts.length) {
          this.apiService.login({ public_address: accounts[0] }).subscribe(
            (result) => {
              this.tokenService.handleData(result.access_token);
            },
            (error) => {},
            () => {
              this.authStateService.setAuthState(true);
              this.zone.run(() => {
                this.router.navigateByUrl('/profile');
              });
            }
          );
        } else {
          this.tokenService.removeToken();
          this.authStateService.setAuthState(false);
          if (this.router.url == '/profile') {
            this.zone.run(() => {
              this.router.navigateByUrl('/gallery');
            });
          }
        }
      });
    }
  }

  title = 'doodles';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
