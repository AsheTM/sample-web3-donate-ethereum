import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Network } from '@ethersproject/networks';
import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { TAppConfigurationCoreRoot } from './app.type';

import { TAppHomeDonation, TAppHomeDonationList } from './app-home';


@Component({
  selector:         'blockchain-root',
  templateUrl:      './app.component.html',
  styleUrls:        ['./app.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush,
  providers:        [AppService]
})
export class AppComponent implements OnInit {

  readonly balanceSubject$:             Observable<string | undefined>
    = this._appService.balanceApp$;
  readonly errorWalletSubject$:         Observable<string | undefined>
    = this._appService.errorWalletSubjectApp$;
  readonly currentFundSubject$:         Observable<string | undefined>
    = this._appService.currentFundApp$;
  readonly donationList:                TAppHomeDonationList
    = this._appService.donationListApp;
  readonly gasFeeSubject$:              Observable<string | undefined>
    = this._appService.gasFeeApp$;
  readonly loadingSubject$:             Observable<boolean>
    = this._appService.loadingSubjectApp$;
  readonly networkSubject$:             Observable<Network['name'] | undefined>
    = this._appService.networkApp$;
  readonly threshold:                   TAppConfigurationCoreRoot['threshold']
    = this._appService.thresholdApp;
  readonly userWalletSubject$:          Observable<string | undefined>
    = this._appService.userWalletApp$;

  constructor(private readonly _appService: AppService) { }

  ngOnInit(): void {
    this._appService.checkIfMetaMaskWalletIsInstalled();
    this._appService.listenAccountChangeEvent();
    this._appService.listenDisconnectChangeEvent();
    this._appService.listenNetworkChangeEvent();
  }

  onConnectEventHandler(): void {
    this._appService.connectToMetaMaskWallet();
  }

  onDonateEventHandler($event: TAppHomeDonation['amount']): void {
    this._appService.donateEther($event);
  }

}
