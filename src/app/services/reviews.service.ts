import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IReview{
  id: number,
  author: string,
  text: string,
  src: string
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }
  
  getReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>('http://localhost:3000/reviews')
  }
}
