import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedDirectivesModule } from './shared-directives.module';
import { SharedCommonModule } from './shared-common.module';
import { SharedComponentsModule } from './shared-components.module';
import { SharedPipesModule } from './shared-pipes.module';


@NgModule({
  exports:  [
    SharedCommonModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule
  ],
  imports:  [
    SharedCommonModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule:   SharedModule,
      providers:  []
    };
  }

}
