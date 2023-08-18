import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Get } from 'src/app/actions/reviews-of-paintings.actions';
import fadeInAnimation from 'src/app/animations/fadeIn.animation';
import tabsAnimation from 'src/app/animations/tabs.animation';
import { ICategory } from 'src/app/services/categories.service';
import { IPainting } from 'src/app/services/paintings.service';
import { IReviewOfPainting } from 'src/app/services/reviews-of-paintings.service';
import { CategoriesState } from 'src/app/state/categories.state';
import { PaintingsState } from 'src/app/state/paintings.state';
import { ReviewsOfPaintingsState } from 'src/app/state/reviews-of-paintings.state';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, tabsAnimation]
})
export class PaintingComponent implements OnInit, OnDestroy{
  sub: Subscription
  stars = [1, 2, 3, 4, 5]
  side = 'left'
  prevElementIndex: number = 0
  currentElementIndex: number = 0
  painting$: Observable<IPainting>
  reviews$: Observable<IReviewOfPainting[]>
  rating$: Observable<number>
  category$: Observable<ICategory>
  //@Select(CategoriesState.selectCategories) categories$!: Observable<ICategory[]>;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
    this.store.dispatch(new Get(+params['id']))
    this.painting$ = this.store.select(PaintingsState.paintingOfId).pipe(map(filterFn => filterFn(+params['id'])))
    this.reviews$ = this.store.select(ReviewsOfPaintingsState.selectReviewsOfPainting).pipe(map(filterFn => filterFn(+params['id'])))
    this.rating$ = this.store.select(ReviewsOfPaintingsState.reviewsRating).pipe(map(filterFn => filterFn(+params['id'])))
    })
    this.sub.add(this.painting$.subscribe(painting => {
      if(painting){
        this.title.setTitle(painting.name)
        this.meta.addTag({
          name: 'discription',
          content: `${painting.name}, ${painting.artist}, buy painting, best paintings`
        })
        this.category$ = this.store.select(CategoriesState.categoryPainting).pipe(map(filterFn => filterFn(painting.categoryId)))
      }
    }))
  }
  
  isActive(num: number): boolean {
    return this.currentElementIndex === num
  }

  setActive(num: number) {
    this.currentElementIndex = num
    if(this.currentElementIndex > this.prevElementIndex) {
      this.side = 'right'
    } else {
      this.side = 'left'
    }
    this.prevElementIndex = this.currentElementIndex
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
