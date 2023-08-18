import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { BasketState } from 'src/app/state/basket.state';
import { BasketService } from 'src/app/services/basket.service';
import counterAnimation from 'src/app/animations/counter.animation';
import { CategoriesState } from 'src/app/state/categories.state';
import { ICategory } from 'src/app/services/categories.service';
import { IPainting } from 'src/app/services/paintings.service';
import { Router } from '@angular/router';
import { Delete } from 'src/app/actions/basket.actions';
import { FormControl } from '@angular/forms';
import { Search } from 'src/app/actions/painting.actions';
import { ReviewsOfPaintingsState } from 'src/app/state/reviews-of-paintings.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [counterAnimation]
})
export class HeaderComponent implements OnInit, OnDestroy{
  stars = [1, 2, 3, 4, 5]
  search: string
  sub: Subscription
  searchControl = new FormControl('');
  @Select(CategoriesState.selectCategories) categories$!: Observable<ICategory[]> 
  @Select(BasketState.numberOfPaintings) paintingsInBasket$!: Observable<number>;
  @Select(BasketState.allSum) allSum$!: Observable<number>;
  @Select(BasketState.paintingNamesInBasket) paintingsInBasketNames!: Observable<string>
  @Select(BasketState.selectPaintings) paintings$!: Observable<IPainting[]>

  constructor(
    public basketService:BasketService,
    public router: Router,
    public store: Store
    ){}

  ngOnInit() {
    this.sub = this.searchControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((value) => {
        console.log(value)
        this.store.dispatch(new Search(value!));
      })
  }

  getRating(id: number) {
    return this.store.select(ReviewsOfPaintingsState.reviewsRating).pipe(map(filterFn => filterFn(id)))
  }

  goToBasket() {
    this.router.navigate(['/basket']);
  }

  delete(id: number) {
    this.store.dispatch(new Delete(id))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
