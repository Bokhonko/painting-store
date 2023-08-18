import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IReviewOfPainting{
  id?: number,
  paintingOfId: number,
  name: string,
  email: string,
  rating: number,
  comment: string
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsOfPaintingsService {

  constructor(private http: HttpClient) { }
  
  postReviewsOfPainting(review: IReviewOfPainting): Observable<IReviewOfPainting> {
    return this.http.post<IReviewOfPainting>('http://localhost:3000/reviewsOfPainting', review)
  }

  getReviewsOfPainting(id: number): Observable<IReviewOfPainting[]> {
    return this.http.get<IReviewOfPainting[]>(`http://localhost:3000/reviewsOfPainting?paintingOfId=${id}`)
  }
}
