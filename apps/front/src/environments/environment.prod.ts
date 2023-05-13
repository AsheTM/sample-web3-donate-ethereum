import { environmentCoreForRootCommon } from "./environment.common";
import { TEnvironement } from "./environment.type";


export const environment: TEnvironement = {
  core:       {
    forRoot: process?.env.THRESHOLD && process?.env.WALLET_ADDRESS ? {
      threshold:  +String(process.env.THRESHOLD),
      wallet:     String(process.env.WALLET_ADDRESS)
    }: environmentCoreForRootCommon
  },
  production: true,
  shared:     null
};
