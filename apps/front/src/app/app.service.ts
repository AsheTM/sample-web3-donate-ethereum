import { Inject, Injectable } from '@angular/core';
import {
  EtherNetworkService,
  EtherTransactionService,
  EtherWalletService,
  ETHER_TOKEN_IS_METAMASK_WALLET,
  ETHER_TOKEN_IS_WALLET_INSTALLED,
  TEtherBigNumber,
  TEtherNetwork,
  TEtherTransactionResponse
} from '@ashetm/ng-ether';
import { Network } from '@ethersproject/networks';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, take }from 'rxjs/operators';

import { APP_TOKEN_THRESHOLD, APP_TOKEN_WALLET_ADDRESS } from './app.token';
import { TAppConfigurationCoreRoot } from './app.type';

import { TAppHomeDonation, TAppHomeDonationList } from './app-home';

import { SHARED_TOKEN_SUPPORTED_NETWORKS, TSharedSupportedNetworks } from './shared';


@Injectable()
export class AppService {

  readonly balanceApp$:             Observable<string>
    = this._etherWalletService.balance$
      .pipe(map((balance: TEtherBigNumber) => balance.toString()));
  readonly currentFundApp$:         Observable<string>
    = this._etherWalletService.getBalanceOf(this._walletAddress)
      .pipe(map((balance: TEtherBigNumber) => balance.toString()));
  readonly errorWalletSubjectApp$:  Subject<string | undefined>
    = new ReplaySubject(1);
  readonly gasFeeApp$:              Observable<string>
    = this._etherNetworkService.gasFee$
      .pipe(map((gasFee: TEtherBigNumber) => gasFee.toString()));
  readonly loadingSubjectApp$:      Subject<boolean>
    = new BehaviorSubject<boolean>(false);
  readonly networkApp$:             Observable<TEtherNetwork['name']>
    = this._etherNetworkService.network$
      .pipe(map(({ name }: TEtherNetwork) => name));
  readonly userWalletApp$:          Observable<string>
    = this._etherWalletService.account$;

  get donationListApp(): TAppHomeDonationList {
    return [
      {
        alt: 'Plant png image',
        amount: '0.01',
        description: 'Plant 5 trees',
        src: '/assets/images/Plant.png'
      }, {
        alt: 'Branch png image',
        amount: '0.02',
        description: 'Plant 10 trees',
        src: '/assets/images/Branch.png'
      }, {
        alt: 'Tree png image',
        amount: '0.2',
        description: 'Plant 100 trees',
        src: '/assets/images/Tree.png'
      }
    ];
  }

  private get _hasWalletInstalledApp(): boolean {
    return this._isWalletInstalled;
  }

  private get _isMetaMaskWalletApp(): boolean {
    return this._isMetaMaskWallet;
  }

  constructor(
    @Inject(APP_TOKEN_THRESHOLD)
      readonly thresholdApp:                TAppConfigurationCoreRoot['threshold'],
    @Inject(APP_TOKEN_WALLET_ADDRESS)
      private readonly _walletAddress:      TAppConfigurationCoreRoot['wallet'],
    @Inject(SHARED_TOKEN_SUPPORTED_NETWORKS)
      private readonly _supportedNetworks:  TSharedSupportedNetworks,
    @Inject(ETHER_TOKEN_IS_WALLET_INSTALLED)
      private readonly _isWalletInstalled:  boolean,
    @Inject(ETHER_TOKEN_IS_METAMASK_WALLET)
      private readonly _isMetaMaskWallet:   boolean,
    private readonly _etherNetworkService:      EtherNetworkService,
    private readonly _etherTransactionService:  EtherTransactionService,
    private readonly _etherWalletService:       EtherWalletService
  ) { }

  checkIfMetaMaskWalletIsInstalled(): void {
    if(!this._hasWalletInstalledApp) {
      return this.errorWalletSubjectApp$.next('You need to install <kbd>MetaMask</kbd> to use this app.');
    }

    if(!this._isMetaMaskWalletApp) {
      return this.errorWalletSubjectApp$.next('Only <kbd>MetaMask</kbd> supported for this app.');
    }
  }

  listenAccountChangeEvent(): void {
    this._etherWalletService.onAccountChange(this._onAccountChangeEventHandler.bind(this));
  }

  listenDisconnectChangeEvent(): void {
    this._etherWalletService.onDisconnect(this._onDisconnectEventHandler.bind(this));
  }

  listenNetworkChangeEvent(): void {
    this._etherNetworkService.onNetworkChange(this._onNetworkChangeEventHandler.bind(this));
  }

  connectToMetaMaskWallet(): void {
    this._startLoading();
    this._etherWalletService.connectWallet()
      .pipe(take(1))
      .subscribe({
        complete: () => {
          this._stopLoading();
        },
        error: () => {
          // if(err.code === -32002) {
          //   this.errorWalletSubjectApp$.next('Already processing connection to MetaMask. Please wait.');
          // } else if(err.code === 4001) {
          //   this.errorWalletSubjectApp$.next('MetaMask connection rejected');
          // } else {
          //   this.errorWalletSubjectApp$.next('Unknown error');
          // }
        }
      });
  }

  donateEther(amount: TAppHomeDonation['amount']): void {
    this._startLoading();
    this._etherTransactionService.prepareTransaction(this._walletAddress)
      .sendEth(+amount)
      .pipe(take(1))
      .subscribe({
        complete: () => {
          this._stopLoading();
        },
        error: (error: unknown) => {
          console.error(error);
        },
        next: async (response: TEtherTransactionResponse) => {
          const receipt = await response.wait();

          console.log({
            response,
            receipt
          });
          alert('Thank you for your contribution!');
        }
      });
  }

  private _clearError(): void {
    this.errorWalletSubjectApp$.next(undefined);
  }

  private _onAccountChangeEventHandler(_: string[]): void {
    this._clearError();
  }

  private _onDisconnectEventHandler(): void {
    this._clearError();
  }

  private _onNetworkChangeEventHandler(newNetwork: Network, oldNetwork?: Network): void {
    if(this._supportedNetworks[Number(newNetwork.chainId)]) {
      this._clearError();
    } else {
      this._updateError(`<kbd>${
        newNetwork.chainId === 1
          ? 'Mainnet'
            : newNetwork.name
      }</kbd> is not supported<br />Only <kbd>Testnet</kbd> networks are available!`);
    }
  }

  private _startLoading(): void {
    this.loadingSubjectApp$.next(true);
  }

  private _stopLoading(): void {
    this.loadingSubjectApp$.next(false);
  }

  private _updateError(message: string): void {
    this.errorWalletSubjectApp$.next(message);
  }

}
