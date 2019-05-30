import { TestBed } from '@angular/core/testing';

import { InputTypeService } from './input-type.service';

describe('InputTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputTypeService = TestBed.get(InputTypeService);
    expect(service).toBeTruthy();
  });
});
