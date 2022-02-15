import { AuthService } from './auth.service';
import { MoralisService } from './moralis.service';
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
  moralis: any = null;
  constructor(
    private router: Router,
    private zone: NgZone,
    private authService: AuthService,
    private moralisService: MoralisService,
    private apiService: ApiService
  ) {
    this.moralis = this.moralisService.getMoralis();

    this.moralis.onAccountChanged((account: any) => {
      this.zone.run(() => {
        if (account) {
          this.moralisService
            .connect(this.moralis.provider)
            .then((user: any) => {
              this.apiService
                .logIn(user.attributes.authData.moralisEth)
                .subscribe({
                  next: (response) => {
                    this.authService.logIn(response);
                  },
                  error: (error) => {
                    this.moralis.logOut();
                  },
                  complete: () => {},
                });
            })
            .catch((error: any) => {});
        } else {
          this.moralis.User.logOut()
            .then(() => {
              this.authService.logOut();
            })
            .catch((error: any) => {});
        }
      });
    });

    this.moralis.onWeb3Deactivated((res: any) => {
      this.zone.run(() => {
        this.authService.logOut();
      });
    });

    // Active Route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnInit() {
    if (!this.moralis.isWeb3Enabled()) {
      this.moralis.User.current()
        ? this.moralis.enableWeb3()
        : this.authService.logOut();
    }
  }

  title = 'doodles';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
