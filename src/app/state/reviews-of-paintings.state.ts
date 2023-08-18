import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Selector, createSelector } from '@ngxs/store';
import * as ReviewsOfPaintingsActions from '../actions/reviews-of-paintings.actions'
import { IReviewOfPainting, ReviewsOfPaintingsService } from '../services/reviews-of-paintings.service';

export interface ReviewsOfPaintingsStateModel {
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly reviewsOfPaintingsListId: Record<string, number[]>;
    readonly reviewsOfPaintings: Record<string, IReviewOfPainting>;
}

export const initialReviewsOfPaintingsState: ReviewsOfPaintingsStateModel = {
    reviewsOfPaintingsListId: {},
    reviewsOfPaintings: {},
    loaded: false,
    loading: false
}

@State<ReviewsOfPaintingsStateModel>({
    name: 'reviewsOfPaintings',
    defaults: initialReviewsOfPaintingsState
})

@Injectable()
export class ReviewsOfPaintingsState implements NgxsOnInit {
    
    @Selector()
    static loaded(state: ReviewsOfPaintingsStateModel): boolean {
      return state.loaded;
    }

    @Selector()
    static selectReviewsOfPainting(state: ReviewsOfPaintingsStateModel) {
        return (id: number) => {
            return state.reviewsOfPaintingsListId[id]?.map(i => state.reviewsOfPaintings[i])
        }
    }

    @Selector()
    static reviewsRating(state: ReviewsOfPaintingsStateModel) {
        return (id: number) => {
            const reviews = state.reviewsOfPaintingsListId[id]?.map(i => state.reviewsOfPaintings[i])
            let rating = 0
            reviews?.map(r => rating += +r.rating)
            return Math.floor(rating/reviews?.length)
        }
    }

    constructor(private reviewsOfPaintingsService: ReviewsOfPaintingsService) {}
    ngxsOnInit(ctx: StateContext<ReviewsOfPaintingsStateModel>): void { }
    
    @Action(ReviewsOfPaintingsActions.Get)
    load(ctx: StateContext<ReviewsOfPaintingsStateModel>, {id}: ReviewsOfPaintingsActions.Get) {
        if(!Boolean(ctx.getState().reviewsOfPaintingsListId[id])){
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.reviewsOfPaintingsService.getReviewsOfPainting(id).subscribe({
            next: res => ctx.dispatch(new ReviewsOfPaintingsActions.GetSuccess(res)),
            error: err => ctx.dispatch(new ReviewsOfPaintingsActions.GetFailure(err))
        }) 
        } 
    }

    @Action(ReviewsOfPaintingsActions.GetSuccess)
    loadSuccess(ctx: StateContext<ReviewsOfPaintingsStateModel>, {reviewsOfPaintings}: ReviewsOfPaintingsActions.GetSuccess) {
        const reviewsById: Record<string, IReviewOfPainting> = {}
        reviewsOfPaintings.forEach(reviews => reviewsById[reviews.id!] = reviews)
        const state = ctx.getState()
        ctx.patchState({
            loaded: true,
            loading: false,
            reviewsOfPaintingsListId: {...state.reviewsOfPaintingsListId, [reviewsOfPaintings[0]?.paintingOfId]: reviewsOfPaintings.map(r => r.id)}, 
            reviewsOfPaintings: {...state.reviewsOfPaintings, ...reviewsById} 
        })
    }

    @Action(ReviewsOfPaintingsActions.GetFailure)
    loadFailure(ctx: StateContext<ReviewsOfPaintingsStateModel>, {error}: ReviewsOfPaintingsActions.GetFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }

    @Action(ReviewsOfPaintingsActions.Post)
    post(ctx: StateContext<ReviewsOfPaintingsStateModel>, {review}:ReviewsOfPaintingsActions.Post) {
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.reviewsOfPaintingsService.postReviewsOfPainting(review).subscribe({
            next: res => ctx.dispatch(new ReviewsOfPaintingsActions.PostSuccess(res)),
            error: err => ctx.dispatch(new ReviewsOfPaintingsActions.PostFailure(err))
        })
    }
    @Action(ReviewsOfPaintingsActions.PostSuccess)
    postSuccess(ctx: StateContext<ReviewsOfPaintingsStateModel>, {review}: ReviewsOfPaintingsActions.PostSuccess) {
        const state = ctx.getState()
        let listId: number[] = []
        console.log(state.reviewsOfPaintingsListId[review.paintingOfId])
        if(state.reviewsOfPaintingsListId[review.paintingOfId]) {
            listId = state.reviewsOfPaintingsListId[review.paintingOfId]
            listId.push(review.id!)
        } else {
            listId.push(review.id!)
        }
        ctx.patchState({
            loaded: true,
            loading: false,
            reviewsOfPaintings: {...state.reviewsOfPaintings, [review.id!]: review},
            reviewsOfPaintingsListId: { [review.paintingOfId!]: listId, ...state.reviewsOfPaintingsListId,}
        })
    }

    @Action(ReviewsOfPaintingsActions.PostFailure)
    postFailure(ctx: StateContext<ReviewsOfPaintingsStateModel>, {error}: ReviewsOfPaintingsActions.PostFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }

}