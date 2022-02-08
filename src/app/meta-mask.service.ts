import { Injectable } from '@angular/core';
import MetaMaskOnboarding from '@metamask/onboarding';

@Injectable({
  providedIn: 'root',
})
export class MetaMaskService {
  constructor() {}

  isMetaMaskInstalled = () => {
    return MetaMaskOnboarding.isMetaMaskInstalled();
  };

  installMetask = () => {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
  };

  connectWithMetaMask(): Promise<Array<string>> {
    const { ethereum } = window as any;
    return ethereum.request({
      method: 'eth_requestAccounts',
    });
  }
}
