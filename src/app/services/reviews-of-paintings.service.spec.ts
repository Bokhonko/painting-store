import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReviewsOfPaintingsService } from './reviews-of-paintings.service';

describe('ReviewsOfPaintingsService', () => {
  let service: ReviewsOfPaintingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReviewsOfPaintingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
