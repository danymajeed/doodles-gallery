import { MetaMaskService } from './../meta-mask.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  constructor(public metaMaskService: MetaMaskService) {}

  ngOnInit(): void {}

  connect() {
    if (this.metaMaskService.isMetaMaskInstalled())
      this.metaMaskService.connectWithMetaMask();
    else this.metaMaskService.installMetask();
  }
}
