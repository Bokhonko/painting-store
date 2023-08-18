import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface IPainting{
  id: number,
  name: string,
  src: string,
  artist: string,
  categoryId: number,
  year: number,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {

  constructor(private http: HttpClient) { }

  getPaintings(): Observable<IPainting[]> {
    return this.http.get<IPainting[]>('http://localhost:3000/paintings')
  }
}
