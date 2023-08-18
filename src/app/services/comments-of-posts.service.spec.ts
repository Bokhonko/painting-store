import { TestBed } from '@angular/core/testing';

import { CommentsOfPostsService } from './comments-of-posts.service';

describe('CommentsOfPostsService', () => {
  let service: CommentsOfPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsOfPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
