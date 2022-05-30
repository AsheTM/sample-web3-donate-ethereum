import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
  name: 'sharedDomSanitizerHtml'
})
export class SharedDomSanitizerHtmlPipe implements PipeTransform {

  constructor(private readonly _domSanitizer: DomSanitizer) { }

  transform(value: string | null | undefined): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(value || '');
  }

}
