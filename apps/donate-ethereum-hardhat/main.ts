import * as dotenv from 'dotenv';
import { utils } from 'ethers';
import { task } from 'hardhat/config';
import { HardhatNetworkAccountConfig, HardhatNetworkAccountsConfig, HardhatNetworkConfig } from 'hardhat/types';


['./.env', './apps/donate-ethereum-hardhat/.env'].forEach((path: string) => {
  dotenv.config({ path })
});

task('wallets', 'Prints the wallet list', async (taskArgs, hre: any) => {
  const wallets = await hre.ethers.getSigners();

  for (const wallet of wallets) {
    console.log(wallet.address);
  }
});


export default {
  gasReporter: {
    enabled: true,
    currency: "USD"
  },
  networks: {
    hardhat:  {
      accounts: Object.entries(process.env)
        .filter(([key, value]: [string, string | undefined]) =>
          key.match(/^NETWORK_HARDHAT_ACCOUNT_\d+$/g) && Boolean(value))
        .map(([_, value]: [string, string | any]) =>
          JSON.parse(value) as Record<'balance' | 'privateKey', string | number>)
        .map(({
          balance,
          privateKey
        }: Record<'balance' | 'privateKey', string | number>) => <HardhatNetworkAccountConfig>({
          balance:    utils.parseEther(String(balance)).toString(),
          privateKey: String(privateKey)
        })) as HardhatNetworkAccountsConfig,
      chainId: +(process.env.NETWORK_HARDHAT_CHAIN_ID || 1337)
    } as HardhatNetworkConfig
  },
  paths: {
    sources:  "./**/*.sol"
  },
  // solidity: "0.8.4",
  solidity: "0.7.3"
};
