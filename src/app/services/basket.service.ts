import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPainting } from './paintings.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  getBasket(): IPainting[] {
    const basketString = localStorage.getItem('basket');
    return basketString ? JSON.parse(basketString) as IPainting[] : []
  }

  addToBasket(basket: IPainting[]): void {
    const basketString = JSON.stringify(basket);
    localStorage.setItem('basket', basketString);
  }
}
