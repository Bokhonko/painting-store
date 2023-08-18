import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICommentOfPost } from 'src/app/services/comments-of-posts.service';
import { CommentsOfPostsState } from 'src/app/state/comments-of-posts.state';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit{
  nestedComments$: Observable<ICommentOfPost[]>
  @Input() name: string;
  @Input() id: number;
  @Input() date: string;
  @Input() comment: string;
  @Input() nestedComments: ICommentOfPost[] | null;
  @Input() level: number;

  constructor(private store: Store) {}

  ngOnInit() {
    this.nestedComments$ = this.store.select(CommentsOfPostsState.selectNestedComment).pipe(map(filterFn => filterFn(this.id)))
  }
}
