import { TestBed } from '@angular/core/testing';

import { CategoryPropertiesResolverService } from './category-properties-resolver.service';

describe('CategoryPropertiesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryPropertiesResolverService = TestBed.get(CategoryPropertiesResolverService);
    expect(service).toBeTruthy();
  });
});
