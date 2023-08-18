import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PaintingsService } from './paintings.service';

describe('PaintingsService', () => {
  let service: PaintingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PaintingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
