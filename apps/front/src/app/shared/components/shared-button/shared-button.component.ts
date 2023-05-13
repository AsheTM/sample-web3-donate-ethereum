import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';


@Component({
  selector:       '<!-- DO NOT INSTANCIATE IN HTML VIEW -->',
  template:       '<ng-content></ng-content>',
  styleUrls:      ['./shared-button.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class SharedButtonComponent {

  @HostBinding('role')      role:     'button'  = 'button';
  @HostBinding('tabindex')  tabindex: 0         = 0;

  @HostBinding('class.loading')
  @Input()
  protected loading: boolean = false;

}
