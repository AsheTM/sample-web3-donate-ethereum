import { TestBed } from '@angular/core/testing';

import { SharedWeb3ProviderService } from './shared-web3-provider.service';

describe('SharedWeb3ProviderService', () => {
  let service: SharedWeb3ProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedWeb3ProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
