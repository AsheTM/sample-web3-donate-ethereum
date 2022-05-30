import { ModuleWithProviders, NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SHARED_TOKEN_WEB3 } from './shared.token';

import {
  SharedButtonComponent,
  SharedButtonMetamaskComponent
} from './components';
import { SharedWeb3OutletDirective } from './directives';
import {
  SharedDomSanitizerHtmlPipe,
  SharedWeiToEtherPipe
} from './pipes';
import {
  SharedWeb3ProviderService,
  SharedWeb3SignerService
} from './services';


@NgModule({
  declarations: [
    SharedButtonComponent,
    SharedButtonMetamaskComponent,

    SharedWeb3OutletDirective,

    SharedDomSanitizerHtmlPipe,
    SharedWeiToEtherPipe
  ],
  exports:      [
    CommonModule,

    SharedButtonMetamaskComponent,

    SharedWeb3OutletDirective,

    SharedDomSanitizerHtmlPipe,
    SharedWeiToEtherPipe
  ],
  imports:      [CommonModule]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule:   SharedModule,
      providers:  [
        {
          provide:    SharedWeb3ProviderService,
          useFactory: (ethereum: any, ngZone: NgZone) => {
            try {
              if(!ethereum) {
                return null;
              }

              return new SharedWeb3ProviderService(ethereum, ngZone);
            } catch (err) {
              console.error(err);

              throw err;
            }
          },
          deps:       [SHARED_TOKEN_WEB3, NgZone]
        }, {
          provide:    SharedWeb3SignerService,
          useFactory: (provider: SharedWeb3ProviderService) => {
            try {
              if(!provider) {
                return null;
              }

              return provider.getSigner();
            } catch (err) {
              console.error(err);

              throw err;
            }
          },
          deps:       [SharedWeb3ProviderService]
        }
      ]
    };
  }

}
