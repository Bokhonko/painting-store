import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IPost{
  id: number,
  name: string,
  src: string,
  date: string,
  author: string,
  tag: string,
  categoryId: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('http://localhost:3000/posts')
  }
}
