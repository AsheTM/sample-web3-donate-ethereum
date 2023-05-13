import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'appHomeDisableDonate'
})
export class AppHomeDisableDonatePipe implements PipeTransform {

  transform(
    amount:   number | string,
    balance:  number | string | null | undefined,
    gasFee:   number | string | null | undefined
  ): boolean {
    return !!balance && !!gasFee && +balance - +gasFee < amount;
  }

}
