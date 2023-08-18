import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Selector, createSelector } from '@ngxs/store';
import * as ReviewsActions from '../actions/reviews.actions'
import { IReview, ReviewsService } from '../services/reviews.service';

export interface ReviewsStateModel {
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly reviews:  IReview[];
}

export const initialReviewsState: ReviewsStateModel = {
    reviews: [],
    loaded: false,
    loading: false
}

@State<ReviewsStateModel>({
    name: 'reviews',
    defaults: initialReviewsState
})

@Injectable()
export class ReviewsState implements NgxsOnInit {
    @Selector()
    static selectReviews(state:ReviewsStateModel): IReview[] {
        return state.reviews
    }
    constructor(private reviewsService: ReviewsService) {}
    ngxsOnInit(ctx: StateContext<ReviewsStateModel>): void {
        ctx.dispatch(new ReviewsActions.Get())
    }
    @Action(ReviewsActions.Get)
    load(ctx: StateContext<ReviewsStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.reviewsService.getReviews().subscribe({
            next: res => ctx.dispatch(new ReviewsActions.GetSuccess(res)),
            error: err => ctx.dispatch(new ReviewsActions.GetFailure(err))
        })
    }

    @Action(ReviewsActions.GetSuccess)
    loadSuccess(ctx: StateContext<ReviewsStateModel>, {reviews}: ReviewsActions.GetSuccess) {
        ctx.patchState({
            loaded: true,
            loading: false,
            reviews: reviews
        })
    }

    @Action(ReviewsActions.GetFailure)
    loadFailure(ctx: StateContext<ReviewsStateModel>, {error}: ReviewsActions.GetFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }
}