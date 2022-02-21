import { ToastrService } from 'ngx-toastr';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private provider: any;
  private ether: any;
  private accounts: any;
  private web3Modal: any;
  private signMessage: string = environment.signMessage;

  constructor(
    private logger: NGXLogger,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: environment.infuraId,
        },
      },
    };

    this.web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      disableInjectedProvider: false,
      providerOptions,
    });

    if (this.web3Modal.cachedProvider) {
      this.setProvider();
    }
  }

  getEther() {
    return this.ether;
  }

  async onAccountChanged(accounts: string) {
    if (accounts.length) {
      this.authService.logOut();
      const data = await this.getAuthPayload();
      this.authService.logIn(data).subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {
          this.toastr.error('', 'Failed To Connect Wallet', {
            toastClass: 'toast-error',
          });
        },
      });
      this.accounts = accounts;
    } else {
      this.disconnect();
    }
  }

  onDisconnect(error: { code: number; message: string }) {
    this.disconnect();
  }

  async setProvider() {
    this.provider = await this.web3Modal.connect();
    this.ether = new ethers.providers.Web3Provider(this.provider);

    this.provider.on('accountsChanged', this.onAccountChanged.bind(this));
    this.provider.on('disconnect', this.onDisconnect.bind(this));
  }

  disconnect = async () => {
    await this.web3Modal.clearCachedProvider();

    if (this.provider && this.provider.removeAllListeners) {
      this.provider.removeAllListeners('accountsChanged');
      this.provider.removeAllListeners('disconnect');
    }

    this.provider = undefined;
    this.ether = undefined;
    this.accounts = undefined;
    this.authService.logOut();
  };

  async getAuthPayload() {
    this.accounts = await this.ether.listAccounts();
    const signer = this.ether.getSigner();
    const signature = await signer.signMessage(this.signMessage);

    return {
      address: this.accounts[0],
      message: this.signMessage,
      signature: signature,
    };
  }

  async connect() {
    this.web3Modal.clearCachedProvider();

    return this.setProvider()
      .then(async () => {
        return await this.getAuthPayload();
      })
      .catch((error: any) => {
        throw error;
      });
  }
}
