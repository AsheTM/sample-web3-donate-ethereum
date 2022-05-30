import { InjectionToken } from "@angular/core";

import { TSharedSupportedNetworks } from "./types";


export const SHARED_TOKEN_SUPPORTED_NETWORKS: InjectionToken<TSharedSupportedNetworks>
  = new InjectionToken<TSharedSupportedNetworks>('SHARED_TOKEN_SUPPORTED_NETWORKS', {
    factory:    () => Object.freeze({
      0x2a:   'Kovan',
      0x3:    'Ropsten',
      0x4:    'Rinkeby',
      0x5:    'Goerli',
      0x539:  'Localhost'
    }),
    providedIn: 'root'
  });

export const SHARED_TOKEN_WEB3:               InjectionToken<any>
  = new InjectionToken<any>('SHARED_TOKEN_WEB3', {
    factory:    () => (window as any).ethereum,
    providedIn: 'root'
  });
