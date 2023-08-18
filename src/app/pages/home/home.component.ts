import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { interval, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ICategory } from 'src/app/services/categories.service';
import { IPainting } from 'src/app/services/paintings.service';
import { IReview } from 'src/app/services/reviews.service';
import { CategoriesState } from 'src/app/state/categories.state';
import { PaintingsState } from 'src/app/state/paintings.state';
import { ReviewsState } from 'src/app/state/reviews.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy{
  sub: Subscription
  paintings: IPainting[] = []
  @Select(PaintingsState.selectPaintings) paintings$!: Observable<IPainting[]>
  @Select(CategoriesState.selectCategories) categories$!: Observable<ICategory[]> 
  @Select(ReviewsState.selectReviews) reviews$!: Observable<IReview[]> 

  carousel$: any

  constructor(private store: Store) {}

  ngOnInit(){
    this.sub = this.paintings$.subscribe(val => this.paintings = val)
    this.carousel$ = interval(2000)
      .pipe(
        startWith(0),
        map((v)=>{
          let bestsellers = this.paintings.slice(0,6)
          let length = bestsellers.length
          let plusOne = v + 1
          let plusTwo = v + 2
          let plusThree = v + 3
          let position1 = v > length-1 ? v % length : v
          let position2 = plusOne > length-1 ? plusOne % length : plusOne
          let position3 = plusTwo > length-1 ? plusTwo % length : plusTwo
          let position4 = plusThree > length-1 ? plusThree % length : plusThree
          return [bestsellers[position1], bestsellers[position2], bestsellers[position3], bestsellers[position4]]   
        })
      )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
