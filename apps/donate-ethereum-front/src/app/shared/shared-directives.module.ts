import { NgModule } from '@angular/core';

import { SharedCommonModule } from './shared-common.module';

import { SharedWeb3OutletDirective } from './directives';


@NgModule({
  declarations: [SharedWeb3OutletDirective],
  exports: [SharedWeb3OutletDirective],
  imports: [SharedCommonModule]
})
export class SharedDirectivesModule { }
