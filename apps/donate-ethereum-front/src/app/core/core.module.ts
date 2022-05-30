import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TCoreConfigurationRoot } from './core.type';

import { APP_TOKEN_THRESHOLD, APP_TOKEN_WALLET_ADDRESS } from '../app.token';


@NgModule({
  exports:  [BrowserModule],
  imports:  [BrowserModule]
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
