import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpDataService } from './data.service';

describe('HttpDataService', () => {
  let service: HttpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
        providers: [HttpDataService]
    });
    service = TestBed.inject(HttpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
