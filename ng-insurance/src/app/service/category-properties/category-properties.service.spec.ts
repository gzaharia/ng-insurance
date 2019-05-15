import { TestBed } from '@angular/core/testing';

import { CategoryPropertiesService } from './category-properties.service';

describe('CategoryPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryPropertiesService = TestBed.get(CategoryPropertiesService);
    expect(service).toBeTruthy();
  });
});
