import { TEnvironement } from "./environment.type";


export const environment: TEnvironement = {
  core:       {
    forRoot: {
      threshold:  +String(process.env.THRESHOLD),
      wallet:     String(process.env.WALLET_ADDRESS)
    }
  },
  production: true,
  shared:     null
};
