import { ApiService } from './../api.service';
import { AuthService } from './../auth.service';
import { MoralisService } from './../moralis.service';
import { Component, OnInit } from '@angular/core';
import { connectors } from './config';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  connectors = connectors;

  constructor(
    private moralisService: MoralisService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  connect(provider: any) {
    this.moralisService
      .connect(provider)
      .then((user: any) => {
        this.apiService.logIn(user.attributes.authData.moralisEth).subscribe({
          next: (response) => {
            this.authService.logIn(response);
          },
          error: (error) => {
            this.moralisService.logOut();
          },
          complete: () => {},
        });
      })
      .catch((error: any) => {});
  }
}
