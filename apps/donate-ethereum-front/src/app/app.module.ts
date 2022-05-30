import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppHomeDisableDonatePipe, AppHomeComponent } from './app-home';
import { AppLoginComponent } from './app-login';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { environment } from '../environments';


@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppLoginComponent,
    AppHomeDisableDonatePipe
  ],
  imports:      [
    CoreModule.forRoot(environment.core.forRoot),
    SharedModule.forRoot()
  ],
  bootstrap:    [AppComponent]
})
export class AppModule { }
