import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedButtonMetamaskComponent } from './shared-button-metamask.component';

describe('SharedButtonMetamaskComponent', () => {
  let component: SharedButtonMetamaskComponent;
  let fixture: ComponentFixture<SharedButtonMetamaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedButtonMetamaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedButtonMetamaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
