import { Component } from '@angular/core';
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
  constructor(private router: Router) {
    // Active Route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnInit() {}

  title = 'doodles';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
