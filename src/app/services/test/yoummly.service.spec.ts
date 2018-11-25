import { TestBed } from '@angular/core/testing';

import { YoummlyService } from '../yummly.service';

describe('YoummlyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoummlyService = TestBed.get(YoummlyService);
    expect(service).toBeTruthy();
  });
});
