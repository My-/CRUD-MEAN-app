import { TestBed } from '@angular/core/testing';

import { SideNav } from '../../model/side-nav';

describe('SideNav', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideNav = TestBed.get(SideNav);
    expect(service).toBeTruthy();
  });
});
