import { NgModule } from '@angular/core';

import { SharedCommonModule } from './shared-common.module';

import { SharedButtonComponent, SharedButtonMetamaskComponent } from './components';


@NgModule({
  declarations: [
    SharedButtonComponent,
    SharedButtonMetamaskComponent
  ],
  exports: [SharedButtonMetamaskComponent],
  imports: [SharedCommonModule]
})
export class SharedComponentsModule { }
