import { TestBed } from '@angular/core/testing';

import { NuggetService } from '../../../main/app/core/service/nugget.service';

describe('NuggetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NuggetService = TestBed.get(NuggetService);
    expect(service).toBeTruthy();
  });
});
