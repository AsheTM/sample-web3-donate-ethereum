import { Pipe, PipeTransform } from '@angular/core';
import { BigNumberish, ethers } from 'ethers';


@Pipe({
  name: 'sharedWeiToEther'
})
export class SharedWeiToEtherPipe implements PipeTransform {

  transform(value: BigNumberish | null | undefined): string | null {
    return value ? ethers.utils.formatEther(value) : null;
  }

}
