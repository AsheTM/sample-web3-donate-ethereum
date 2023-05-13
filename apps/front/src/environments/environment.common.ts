// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { TEnvironmentConfiguration } from "./environment.type";


export const environmentCoreForRootCommon: TEnvironmentConfiguration['forRoot'] = {
  threshold:  100,
  wallet:     '0x6f281E5649cF29FbB68f9aCDc9005892355740b1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
