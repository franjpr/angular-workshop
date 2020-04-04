import { TestBed } from '@angular/core/testing';

import { MembersApiService } from './members-api.service';

describe('MembersApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembersApiService = TestBed.get(MembersApiService);
    expect(service).toBeTruthy();
  });
});
