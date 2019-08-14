import { TestBed } from '@angular/core/testing';

import { GlobeService } from './globe.service';

describe('GlobeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobeService = TestBed.get(GlobeService);
    expect(service).toBeTruthy();
  });
});
