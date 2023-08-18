import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators'
import { Post } from 'src/app/actions/reviews-of-paintings.actions';
import { IReviewOfPainting } from 'src/app/services/reviews-of-paintings.service';
import { ReviewsOfPaintingsState } from 'src/app/state/reviews-of-paintings.state';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  form: FormGroup
  successMessage: string = ''
  @Select(ReviewsOfPaintingsState.loaded) loaded$: Observable<boolean>
  @Input() paintingId : number

  constructor(private store: Store, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rating: new FormControl('1', Validators.required),
      comment: new FormControl('', Validators.maxLength(1000))
    })
  }

  submit() {
    const {name, email, rating, comment} = this.form.value;
    const newComment: IReviewOfPainting = {
      paintingOfId: this.paintingId,
      name,
      email,
      rating,
      comment,
    };
    this.store.dispatch(new Post(newComment))
    this.loaded$
        .pipe(
          filter(value => !!value),
          take(1),
        )
        .subscribe(loaded => {
          this.form.reset();
          this.successMessage = 'Thank you for review'
          this.ref.markForCheck()
        });
  }
}
