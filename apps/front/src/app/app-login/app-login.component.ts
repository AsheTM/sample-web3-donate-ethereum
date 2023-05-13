import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';


@Component({
  selector:         'blockchain-app-login[loading]',
  template:         `
    <button blockchain-shared-button-metamask
      [class.loading]="loading"
      (click)="loading || onConnectClickEventHandler()"></button>
  `,
  styleUrls:        ['./app-login.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class AppLoginComponent {

  @Input() loading!: boolean;

  @Output() connect: EventEmitter<void> = new EventEmitter();

  onConnectClickEventHandler(): void {
    this.connect.emit();
  }

}
