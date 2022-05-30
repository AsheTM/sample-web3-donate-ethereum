import { Inject, Injectable, NgZone } from '@angular/core';
import { Network } from '@ethersproject/networks';
import { ethers } from 'ethers';

import { SHARED_TOKEN_WEB3 } from '../shared.token';


@Injectable()
export class SharedWeb3ProviderService extends ethers.providers.Web3Provider {

  constructor(
    @Inject(SHARED_TOKEN_WEB3)
      private readonly _web3: any,
    private readonly _ngZone: NgZone
  ) {
    super(_web3, 'any');
  }

  connectToWallet(): Promise<string[] | never> {
    return this.send('eth_requestAccounts', []);
  }

  onAccountChange(fn: (accounts: string[]) => void): void {
    this._onAccountChange((accounts: string[]) => {
      if(accounts.length) {
        fn(accounts);
      }
    });
  }

  onDisconnect(fn: () => void): void {
    this._onAccountChange((accounts: string[]) => {
      if(!accounts.length) {
        fn();
      }
    });
  }

  onNetworkChange(fn: (newNetwork: Network, oldNetwork?: Network) => void): void {
    this._ngZone.run(() => this.on('network', fn));
  }

  private _onAccountChange(fn: (accounts: string[]) => void): void {
    this._ngZone.run(() => (this.provider as any).on('accountsChanged', fn));
  }

}
