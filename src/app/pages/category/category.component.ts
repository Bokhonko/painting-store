import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ICategory } from 'src/app/services/categories.service';
import { IPainting } from 'src/app/services/paintings.service';
import { CategoriesState } from 'src/app/state/categories.state';
import { PaintingsState } from 'src/app/state/paintings.state';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit, OnDestroy{
  stars = [5, 4, 3, 2, 1]
  val1 = 1000
  val2 = 2500
  category: string
  search: string
  sub: Subscription
  paintings$: Observable<IPainting[]>;
  @Select(CategoriesState.selectCategories) categories$!: Observable<ICategory[]>;
  //paintingsAll$: Observable<IPainting[]>

  constructor(
    private store: Store,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
    this.category = params['name']
    this.paintings$ = this.store.select(PaintingsState.paintingOfCategory).pipe(map(filterFn => filterFn(+params['id'])))
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
