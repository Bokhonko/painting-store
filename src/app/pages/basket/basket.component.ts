import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Delete } from 'src/app/actions/basket.actions';
import basketAnimation from 'src/app/animations/basket.animation';
import { IPainting } from 'src/app/services/paintings.service';
import { ReviewsOfPaintingsState } from 'src/app/state/reviews-of-paintings.state';
import { BasketState } from '../../state/basket.state'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [basketAnimation]
})

export class BasketComponent implements OnInit{
  stars = [1, 2, 3, 4, 5]
  @Select(BasketState.allSum) allSum$!: Observable<number>;
  @Select(BasketState.selectPaintings) paintings$!: Observable<IPainting[]>;

  constructor(public store: Store){}

  ngOnInit(): void {

  }

  delete(id: number) {
    this.store.dispatch(new Delete(id))
  }

  getRating(id: number) {
    return this.store.select(ReviewsOfPaintingsState.reviewsRating).pipe(map(filterFn => filterFn(id)))
  }
}
