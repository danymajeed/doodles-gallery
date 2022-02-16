import { ApiService } from './../api.service';
import { AuthService } from './../auth.service';
import { MoralisService } from './../moralis.service';
import { Component, OnInit } from '@angular/core';
import { connectors } from './config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  connectors = connectors;
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private moralisService: MoralisService,
    private authService: AuthService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  connect(provider: any) {
    this.loading = true;
    this.moralisService
      .connect(provider)
      .then((user: any) => {
        this.apiService.logIn(user.attributes.authData.moralisEth).subscribe({
          next: (response) => {
            this.authService.logIn(response);
          },
          error: (error) => {
            this.moralisService.logOut().then(() => {
              this.toastr.error('', 'Failed To Connect Wallet', {
                toastClass: 'toast-error',
              });
            });
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        });
      })
      .catch((error: any) => {
        this.loading = false;
      });
  }
}
