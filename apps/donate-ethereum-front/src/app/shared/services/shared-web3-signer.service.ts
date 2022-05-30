import { Injectable } from '@angular/core';
import { ethers } from 'ethers';


@Injectable()
export class SharedWeb3SignerService extends ethers.providers.JsonRpcSigner {

  private constructor(
    private readonly _provider: ethers.providers.JsonRpcProvider
  ) {
    super(null, _provider);

    throw new Error('SharedWeb3SignerService do not instanciate!');
  }

}
