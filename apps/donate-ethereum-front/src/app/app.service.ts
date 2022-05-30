import { Inject, Injectable, Optional } from '@angular/core';
import { Network } from '@ethersproject/networks';
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import { APP_TOKEN_THRESHOLD, APP_TOKEN_WALLET_ADDRESS } from './app.token';
import { TAppConfigurationCoreRoot } from './app.type';

import { TAppHomeDonation, TAppHomeDonationList } from './app-home';

import {
  SHARED_TOKEN_SUPPORTED_NETWORKS,
  SHARED_TOKEN_WEB3,
  SharedWeb3ProviderService,
  SharedWeb3SignerService,
  TSharedSupportedNetworks
} from './shared';


@Injectable()
export class AppService {

  readonly balanceSubjectApp$:      Subject<string | undefined>
    = new BehaviorSubject<string | undefined>(undefined);
  readonly currentFundSubjectApp$:  Subject<string | undefined>
    = new BehaviorSubject<string | undefined>(undefined);
  readonly errorWalletSubjectApp$:  Subject<string | undefined>
    = new ReplaySubject(1);
  readonly gasFeeSubjectApp$:       Subject<string | undefined>
    = new BehaviorSubject<string | undefined>(undefined);
  readonly loadingSubjectApp$:      Subject<boolean>
    = new BehaviorSubject<boolean>(false);
  readonly networkSubjectApp$:      Subject<Network['name'] | undefined>
    = new BehaviorSubject<Network['name'] | undefined>(undefined);
  readonly userWalletSubjectApp$:   Subject<string | undefined>
    = new ReplaySubject<string | undefined>(1);

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
    return Boolean(this._web3);
  }

  private get _isMetaMaskWalletApp(): boolean {
    return Boolean(this._web3?.isMetaMask);
  }

  constructor(
    @Inject(APP_TOKEN_THRESHOLD)
      readonly thresholdApp:                        TAppConfigurationCoreRoot['threshold'],
    @Inject(APP_TOKEN_WALLET_ADDRESS)
      private readonly _walletAddress:              TAppConfigurationCoreRoot['wallet'],
    @Inject(SHARED_TOKEN_SUPPORTED_NETWORKS)
      private readonly _supportedNetworks:          TSharedSupportedNetworks,
    @Inject(SHARED_TOKEN_WEB3)
      private readonly _web3:                       any,
    @Optional()
      private readonly _sharedWeb3ProviderService:  SharedWeb3ProviderService,
    @Optional()
      private readonly _sharedWeb3SignerService:    SharedWeb3SignerService
  ) {
    this._sharedWeb3ProviderService?.onAccountChange(this._onAccountChangeEventHandler.bind(this));
    this._sharedWeb3ProviderService?.onDisconnect(this._onDisconnectEventHandler.bind(this));
    this._sharedWeb3ProviderService?.onNetworkChange(this._onNetworkChangeEventHandler.bind(this));
  }

  checkIfMetaMaskWalletIsInstalled(): void {
    if(!this._hasWalletInstalledApp) {
      return this.errorWalletSubjectApp$.next('You need to install <kbd>MetaMask</kbd> to use this app.');
    }

    if(!this._isMetaMaskWalletApp) {
      return this.errorWalletSubjectApp$.next('Only <kbd>MetaMask</kbd> supported for this app.');
    }
  }

  async allowOnlySupportedNetworks(): Promise<void> {
    const network: Network
      = await this._sharedWeb3ProviderService.detectNetwork();

    if(network) {
      this._onNetworkChangeEventHandler(network);
    }
  }

  async resumeWalletSession(): Promise<void> {
    const listAccounts: string[]
      = await this._sharedWeb3ProviderService.listAccounts();

    if(listAccounts.length !== 0) {
      await this.connectToMetaMaskWallet();
    }
  }

  async connectToMetaMaskWallet(): Promise<void> {
    try {
      this.loadingSubjectApp$.next(true);
      await this._sharedWeb3ProviderService.connectToWallet();
    } catch(err: any & Record<'code', number> & Record<'message', string>) {
      // if(err.code === -32002) {
      //   this.errorWalletSubjectApp$.next('Already processing connection to MetaMask. Please wait.');
      // } else if(err.code === 4001) {
      //   this.errorWalletSubjectApp$.next('MetaMask connection rejected');
      // } else {
      //   this.errorWalletSubjectApp$.next('Unknown error');
      // }
    } finally {
      this.loadingSubjectApp$.next(false);
    }
  }

  async donateEther(amount: TAppHomeDonation['amount']): Promise<void> {
    this.loadingSubjectApp$.next(true);

    try {
      const response: TransactionResponse
        = await this._sharedWeb3SignerService.sendTransaction({
          to:       this._walletAddress,
          value:    ethers.utils.parseEther(amount + ''),
          chainId:  this._sharedWeb3ProviderService.getNetwork()
            .then(({ chainId }: Network) => chainId)
        });
      const receipt: TransactionReceipt = await response.wait();

      console.log({ response, receipt });
      this._syncBalance();
      this._syncCurrentFund();
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingSubjectApp$.next(false);
      alert('Thank you for your contribution!');
    }
  }

  private _onAccountChangeEventHandler(wallets: string[]): void {
    const [wallet]: string[] = wallets;

    this._clearError();
    this._syncBalance(wallet);
    this._syncCurrentFund();
    this._syncGasFee();
    this._syncWallet(wallet);
  }

  private _onDisconnectEventHandler(): void {
    this._clearError();
    this._clearBalance();
    this._clearGasFee();
    this._clearNetwork();
    this._clearWallet();
  }

  private _onNetworkChangeEventHandler(newNetwork: Network, oldNetwork?: Network): void {
    if(this._supportedNetworks[Number(newNetwork.chainId)]) {
      this._clearError();
      this._syncBalance();
      this._syncCurrentFund();
      this._syncGasFee();
      this._syncNetwork(newNetwork);
      this._syncWallet();
    } else {
      this._clearBalance();
      this._clearGasFee();
      this._clearNetwork();
      this._clearWallet();
      this._updateError(`<kbd>${
        newNetwork.chainId === 1
          ? 'Mainnet'
            : newNetwork.name
      }</kbd> is not supported<br />Only <kbd>Testnet</kbd> networks are available!`);
    }
  }

  private _clearBalance(): void {
    this.balanceSubjectApp$.next(undefined);
  }

  private _clearError(): void {
    this.errorWalletSubjectApp$.next(undefined);
  }

  private _clearGasFee(): void {
    this.gasFeeSubjectApp$.next(undefined);
  }

  private _clearNetwork(): void {
    this.networkSubjectApp$.next(undefined);
  }

  private _clearWallet(): void {
    this.userWalletSubjectApp$.next(undefined);
  }

  private _updateError(message: string): void {
    this.errorWalletSubjectApp$.next(message);
  }

  private async _syncBalance(wallet?: string): Promise<void> {
    wallet = wallet || (await this._sharedWeb3ProviderService.listAccounts())[0];

    const balance:  string
      = (await this._sharedWeb3ProviderService.getBalance(wallet)).toString();

    this.balanceSubjectApp$.next(balance);
  }

  private async _syncCurrentFund(): Promise<void> {
    const currentFund: string = await this._sharedWeb3ProviderService.getBalance(this._walletAddress)
      .then((value: BigNumber) => value.toString());

    this.currentFundSubjectApp$.next(currentFund);
  }

  private async _syncGasFee(): Promise<void> {
    const gasFee: string
      = (await this._sharedWeb3ProviderService.getGasPrice()).toString();

    this.gasFeeSubjectApp$.next(gasFee);
  }

  private async _syncNetwork(network?: Network): Promise<void> {
    network = network || await this._sharedWeb3ProviderService.detectNetwork();

    const networkName: Network['name'] | undefined
      = this._supportedNetworks[Number(network.chainId)];

    this.networkSubjectApp$.next(networkName);
  }

  private async _syncWallet(wallet?: string): Promise<void> {
    wallet = wallet || (await this._sharedWeb3ProviderService.listAccounts())[0];

    this.userWalletSubjectApp$.next(wallet);
  }

}
