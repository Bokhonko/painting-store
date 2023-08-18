import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'cypress/types/bluebird';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Get } from 'src/app/actions/comments-of-posts.action';
import { ICommentOfPost } from 'src/app/services/comments-of-posts.service';
import { IPost } from 'src/app/services/posts.service';
import { CommentsOfPostsState } from 'src/app/state/comments-of-posts.state';
import { PostsState } from 'src/app/state/posts.state';

@Component({
  selector: 'app-post',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy{
  sub: Subscription
  post$: Observable<IPost>
  nestedComments$: Observable<ICommentOfPost[]>
  comment$: Observable<ICommentOfPost[]>
  allComment$: Observable<ICommentOfPost[]>
  constructor(
    private route: ActivatedRoute,
    private store: Store
  ){}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new Get(+params['id']))
      this.post$ = this.store.select(PostsState.postOfId).pipe(map(filterFn => filterFn(+params['id'])))
      this.allComment$ = this.store.select(CommentsOfPostsState.selectCommentsOfPosts).pipe(map(filterFn => filterFn(+params['id'])))
      this.comment$ = this.store.select(CommentsOfPostsState.selectLevelComments).pipe(map(filterFn => filterFn(0)))
      this.comment$.subscribe(val => val.forEach((comment) => {
        this.nestedComments$ = this.store.select(CommentsOfPostsState.selectNestedComment).pipe(map(filterFn => filterFn(comment.id!)))
      }))
    })
  }

  levelComments(level: number): Observable<ICommentOfPost[]> {
    return this.store.select(CommentsOfPostsState.selectLevelComments).pipe(map(filterFn => filterFn(level)))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
