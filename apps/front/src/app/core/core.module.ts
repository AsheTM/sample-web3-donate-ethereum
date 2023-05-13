import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EtherModule } from '@ashetm/ng-ether';

import { TCoreConfigurationRoot } from './core.type';

import { APP_TOKEN_THRESHOLD, APP_TOKEN_WALLET_ADDRESS } from '../app.token';


@NgModule({
  exports:  [
    BrowserModule,
    EtherModule
  ],
  imports:  [
    BrowserModule,
    EtherModule.forRoot()
  ]
})
export class CoreModule {

  static forRoot({
    threshold,
    wallet
  }: TCoreConfigurationRoot): ModuleWithProviders<CoreModule> {
    return {
      ngModule:   CoreModule,
      providers:  [
        {
          provide:  APP_TOKEN_THRESHOLD,
          useValue: threshold
        }, {
          provide:  APP_TOKEN_WALLET_ADDRESS,
          useValue: wallet
        }
      ]
    };
  }

}
