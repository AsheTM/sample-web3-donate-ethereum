import { TAppConfigurationCoreRoot } from "../app";


export type TEnvironement = {
  core:       TEnvironmentConfiguration;
  production: boolean;
  shared:     null | never;
};

export type TEnvironmentConfiguration = Record<'forRoot', TAppConfigurationCoreRoot>;
