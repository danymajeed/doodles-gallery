import { Web3Service } from './../web3.service';
import { AuthService } from './../auth.service';
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
    private authService: AuthService,
    private toastr: ToastrService,
    private web3Service: Web3Service
  ) {}

  ngOnInit(): void {}

  connect() {
    this.loading = true;
    this.web3Service
      .connect()
      .then((data: any) => {
        this.authService
          .logIn(data)
          .subscribe({
            next: (response) => {},
            error: (error) => {
              this.error = error;
              this.toastr.error('', 'Failed To Connect Wallet', {
                toastClass: 'toast-error',
              });
            },
          })
          .add(() => {
            this.loading = false;
          });
      })
      .catch((error: any) => {
        this.loading = false;
      });
  }
}
