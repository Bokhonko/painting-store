import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ICommentOfPost{
  id?: number,
  postOfId: number,
  name: string,
  email: string,
  level: number,
  date: string,
  parentId: null | number,
  nestedComment: number[] | []
}

@Injectable({
  providedIn: 'root'
})
export class CommentsOfPostsService {
  constructor(private http: HttpClient) { }
  
  postCommentsOfPosts(comment: ICommentOfPost): Observable<ICommentOfPost> {
    return this.http.post<ICommentOfPost>('http://localhost:3000/comments', comment)
  }

  getCommentsOfPosts(id: number): Observable<ICommentOfPost[]> {
    return this.http.get<ICommentOfPost[]>(`http://localhost:3000/comments?postOfId=${id}`)
  }
}
