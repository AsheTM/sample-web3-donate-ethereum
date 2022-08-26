import { NgModule } from '@angular/core';

import { SharedCommonModule } from './shared-common.module';

import {
  SharedDomSanitizerHtmlPipe,
  SharedWeiToEtherPipe
} from './pipes';


@NgModule({
  declarations: [
    SharedDomSanitizerHtmlPipe,
    SharedWeiToEtherPipe
  ],
  exports: [
    SharedDomSanitizerHtmlPipe,
    SharedWeiToEtherPipe
  ],
  imports: [SharedCommonModule]
})
export class SharedPipesModule { }
