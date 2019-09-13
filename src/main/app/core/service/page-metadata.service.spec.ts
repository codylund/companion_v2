import { TestBed } from '@angular/core/testing';

import { PageMetadataService } from './page-metadata.service';

describe('MetadataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageMetadataService = TestBed.get(PageMetadataService);
    expect(service).toBeTruthy();
  });
});
