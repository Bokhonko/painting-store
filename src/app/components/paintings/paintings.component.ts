import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasketState } from '../../state/basket.state';
import { BasketService } from '../../services/basket.service';
import { IPainting } from '../../services/paintings.service';
import { Add } from '../../actions/basket.actions';
import { ReviewsOfPaintingsState } from '../../state/reviews-of-paintings.state';

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaintingsComponent implements OnInit{
  stars = [1, 2, 3, 4, 5]
  @Input() painting: IPainting
  rating$: Observable<number>

  constructor(private store: Store, public basketService: BasketService){ }

  ngOnInit(): void {
    this.rating$ = this.store.select(ReviewsOfPaintingsState.reviewsRating).pipe(map(filterFn => filterFn(this.painting.id)))
  }
  
  checkPaintingInBasket(id:number):Observable<boolean> {
    return this.store.select(BasketState.isPaintingInBasket).pipe(map(filterFn => filterFn(id)))
  }

  addPaintings(painting: IPainting) {
    this.store.dispatch(new Add(painting))
  }
}
