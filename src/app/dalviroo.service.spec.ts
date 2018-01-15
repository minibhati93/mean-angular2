import { TestBed, inject } from '@angular/core/testing';

import { DalvirooService } from './dalviroo.service';

describe('DalvirooService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DalvirooService]
    });
  });

  it('should be created', inject([DalvirooService], (service: DalvirooService) => {
    expect(service).toBeTruthy();
  }));
});
