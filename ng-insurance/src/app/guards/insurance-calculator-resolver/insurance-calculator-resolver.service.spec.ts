import { TestBed } from '@angular/core/testing';

import { InsuranceCalculatorResolverService } from './insurance-calculator-resolver.service';

describe('InsuranceCalculatorResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuranceCalculatorResolverService = TestBed.get(InsuranceCalculatorResolverService);
    expect(service).toBeTruthy();
  });
});
