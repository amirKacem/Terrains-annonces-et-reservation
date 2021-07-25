import { TestBed } from '@angular/core/testing';

import { TerrainsService } from './terrains.service';

describe('TerrainsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TerrainsService = TestBed.get(TerrainsService);
    expect(service).toBeTruthy();
  });
});
