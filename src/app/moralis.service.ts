import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import Moralis from 'moralis';

@Injectable({
  providedIn: 'root',
})
export class MoralisService {
  constructor(private authService: AuthService) {
    const serverUrl = 'https://a1mdmh2od834.usemoralis.com:2053/server';
    const appId = 'ipBhbGrbgOS2iQeWNTmfig59Azr4RluH0hpCIc8j';

    Moralis.start({ serverUrl, appId });
  }

  getMoralis() {
    return Moralis;
  }

  logOut() {
    return Moralis.User.logOut();
  }

  connect(provider: any) {
    return Moralis.authenticate({
      provider: provider,
      signingMessage: 'Hello Doodles',
    })
      .then((user: any) => {
        if (!Moralis.isWeb3Enabled()) Moralis.enableWeb3();
        return user;
      })
      .catch((error: any) => {
        return error;
      });
  }
}
