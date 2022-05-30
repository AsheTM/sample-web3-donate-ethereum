import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedButtonComponent } from '../shared-button';

@Component({
  selector:         'button[blockchain-shared-button-metamask]',
  template:         `
  Connect your <img alt="Metamask logo"
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
    srcset="" /> MetaMask Wallet
  `,
  styleUrls:        [
    '../shared-button/shared-button.component.scss',

    './shared-button-metamask.component.scss'
  ],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class SharedButtonMetamaskComponent extends SharedButtonComponent { }
