import { InjectionToken } from "@angular/core";

import { TAppConfigurationCoreRoot } from "./app.type";


export const APP_TOKEN_THRESHOLD:       InjectionToken<TAppConfigurationCoreRoot['threshold']>
  = new InjectionToken<TAppConfigurationCoreRoot['wallet']>('APP_TOKEN_THRESHOLD');
export const APP_TOKEN_WALLET_ADDRESS:  InjectionToken<TAppConfigurationCoreRoot['wallet']>
  = new InjectionToken<TAppConfigurationCoreRoot['wallet']>('APP_TOKEN_WALLET_ADDRESS');
