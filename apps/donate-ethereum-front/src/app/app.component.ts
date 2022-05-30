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
    = this._appService.balanceSubjectApp$;
  readonly errorWalletSubject$:         Observable<string | undefined>
    = this._appService.errorWalletSubjectApp$;
  readonly currentFundSubject$:         Observable<string | undefined>
    = this._appService.currentFundSubjectApp$;
  readonly donationList:                TAppHomeDonationList
    = this._appService.donationListApp;
  readonly gasFeeSubject$:              Observable<string | undefined>
    = this._appService.gasFeeSubjectApp$;
  readonly loadingSubject$:             Observable<boolean>
    = this._appService.loadingSubjectApp$;
  readonly networkSubject$:             Observable<Network['name'] | undefined>
    = this._appService.networkSubjectApp$;
  readonly threshold:                   TAppConfigurationCoreRoot['threshold']
    = this._appService.thresholdApp;
  readonly userWalletSubject$:          Observable<string | undefined>
    = this._appService.userWalletSubjectApp$;

  constructor(private readonly _appService: AppService) { }

  ngOnInit(): void {
    this._appService.checkIfMetaMaskWalletIsInstalled();
    this._appService.allowOnlySupportedNetworks();
    this._appService.resumeWalletSession();
  }

  onConnectEventHandler(): void {
    this._appService.connectToMetaMaskWallet();
  }

  onDonateEventHandler($event: TAppHomeDonation['amount']): void {
    this._appService.donateEther($event);
  }

}
