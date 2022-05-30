import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ethers } from 'ethers';

import { TAppHomeDonation, TAppHomeDonationList } from './app-home.type';

import { TAppConfigurationCoreRoot } from '../app.type';


@Component({
  selector:         'blockchain-app-home[address][balance][currentFund][donationList][gasFee][loading][network][threshold]',
  templateUrl:      './app-home.component.html',
  styleUrls:        ['./app-home.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class AppHomeComponent {

  @Input() address!:      string | null | undefined;
  @Input() balance!:      string | null | undefined;
  @Input() currentFund!:  string | null | undefined;
  @Input() donationList!: TAppHomeDonationList;
  @Input() gasFee!:       string | null | undefined;
  @Input() loading!:      boolean;
  @Input() network!:      string | null | undefined;
  @Input() threshold!:    TAppConfigurationCoreRoot['threshold'] | null | undefined;

  @Output() donate: EventEmitter<TAppHomeDonation['amount']>
    = new EventEmitter();

  get balanceMinusGasFee(): number {
    try {
      return +ethers.utils.formatEther(Number(this.balance) - Number(this.gasFee)).toString();
    } catch (error) {
      return 0;
    }
  }

  get isGoalReached(): boolean {
    try {
      return Number(this.threshold) - ethers.utils.parseEther(String(this.currentFund)).toNumber() <= 0;
    } catch (error) {
      return false;
    }
  }

  onDonateClickEventHandler(amount: TAppHomeDonation['amount']): void {
    this.donate.emit(amount);
  }

}
