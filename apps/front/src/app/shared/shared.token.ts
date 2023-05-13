import { InjectionToken, isDevMode } from "@angular/core";

import { TSharedSupportedNetworks } from "./types";


export const SHARED_TOKEN_SUPPORTED_NETWORKS: InjectionToken<TSharedSupportedNetworks>
  = new InjectionToken<TSharedSupportedNetworks>('SHARED_TOKEN_SUPPORTED_NETWORKS', {
    factory:    () => Object.freeze({
      0x2a:   'Kovan',
      0x3:    'Ropsten',
      0x4:    'Rinkeby',
      0x5:    'Goerli',
      ...(isDevMode() ? { 0x539:  'Localhost' } : {})
    }),
    providedIn: 'root'
  });
