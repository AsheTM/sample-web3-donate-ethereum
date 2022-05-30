import { TestBed } from '@angular/core/testing';

import { SharedWeb3SignerService } from './shared-web3-signer.service';

describe('SharedWeb3SignerService', () => {
  let service: SharedWeb3SignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedWeb3SignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
