import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/services/posts.service';
import { PostsState } from 'src/app/state/posts.state';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  @Select(PostsState.selectPosts) posts$: Observable<IPost[]>
}
