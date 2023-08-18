import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Selector, createSelector } from '@ngxs/store';
import * as CommentsOfPostsActions from '../actions/comments-of-posts.action'
import { CommentsOfPostsService, ICommentOfPost } from '../services/comments-of-posts.service';

export interface CommentsOfPostsStateModel {
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly commentsOfPostsListId: Record<string, number[]>;
    readonly commentsOfPosts: Record<string, ICommentOfPost>;
    readonly commentsLevel: Record<string, number[]>;
}

export const initialCommentsOfPostsState: CommentsOfPostsStateModel = {
    commentsOfPostsListId: {},
    commentsOfPosts: {},
    commentsLevel: {},
    loaded: false,
    loading: false
}

@State<CommentsOfPostsStateModel>({
    name: 'commentsOfPosts',
    defaults: initialCommentsOfPostsState
})

@Injectable()
export class CommentsOfPostsState implements NgxsOnInit {
    //paintingOfId = new Set()
    @Selector()
    static loaded(state: CommentsOfPostsStateModel): boolean {
      return state.loaded;
    }

    @Selector()
    static selectCommentsOfPosts(state: CommentsOfPostsStateModel) {
        return (id: number) => {
            return state.commentsOfPostsListId[id]?.map(i => state.commentsOfPosts[i])
        }
    }

    @Selector()
    static selectNestedComment(state: CommentsOfPostsStateModel) {
        return (id: number) => {
            const nestedComment: ICommentOfPost[] = []
            if(state.commentsOfPosts[id].nestedComment){
                const nestedId = state.commentsOfPosts[id].nestedComment
                
                nestedId?.forEach((id) => {nestedComment.push(state.commentsOfPosts[id])})
            } 
            console.log(nestedComment)
            return nestedComment
        }
    }

    @Selector()
    static selectLevelComments(state: CommentsOfPostsStateModel) {
        return (level: number) => {
            return state.commentsLevel[level].map(i => state.commentsOfPosts[i])
        }
    }

    // @Selector()
    // static reviewsRating(state: CommentsOfPostsStateModel) {
    //     return (id: number) => {
    //         const reviews = state.reviewsOfPaintingsListId[id]?.map(i => state.reviewsOfPaintings[i])
    //         let rating = 0
    //         reviews?.map(r => rating += +r.rating)
    //         return Math.floor(rating/reviews?.length)
    //     }
    // }

    constructor(private commentsOfPostsService: CommentsOfPostsService) {}
    ngxsOnInit(ctx: StateContext<CommentsOfPostsStateModel>): void { }
    
    @Action(CommentsOfPostsActions.Get)
    load(ctx: StateContext<CommentsOfPostsStateModel>, {id}: CommentsOfPostsActions.Get) {
        if(!Boolean(ctx.getState().commentsOfPostsListId[id])){
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.commentsOfPostsService.getCommentsOfPosts(id).subscribe({
            next: res => ctx.dispatch(new CommentsOfPostsActions.GetSuccess(res)),
            error: err => ctx.dispatch(new CommentsOfPostsActions.GetFailure(err))
        }) 
        } 
    }

    @Action(CommentsOfPostsActions.GetSuccess)
    loadSuccess(ctx: StateContext<CommentsOfPostsStateModel>, {commentsOfPosts}: CommentsOfPostsActions.GetSuccess) {
        const commentsById: Record<string, ICommentOfPost> = {}
        const commentsLevel: Record<string, number[]> = {}
        commentsOfPosts.forEach(comment => commentsById[comment.id!] = comment)
        commentsOfPosts.forEach(comment => {
            if (commentsLevel[comment.level]) {
                commentsLevel[comment.level].push(comment.id!)
            } else {
                commentsLevel[comment.level] = [comment.id!]
            }
        })
        const state = ctx.getState()
        ctx.patchState({
            loaded: true,
            loading: false,
            commentsOfPostsListId: {...state.commentsOfPostsListId, [commentsOfPosts[0]?.postOfId]: commentsOfPosts.map(c => c.id)}, 
            commentsOfPosts: {...state.commentsOfPosts, ...commentsById},
            commentsLevel:  commentsLevel
        
        })
    }

    @Action(CommentsOfPostsActions.GetFailure)
    loadFailure(ctx: StateContext<CommentsOfPostsStateModel>, {error}: CommentsOfPostsActions.GetFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }

    @Action(CommentsOfPostsActions.Post)
    post(ctx: StateContext<CommentsOfPostsStateModel>, {comment}:CommentsOfPostsActions.Post) {
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.commentsOfPostsService.postCommentsOfPosts(comment).subscribe({
            next: res => ctx.dispatch(new CommentsOfPostsActions.PostSuccess(res)),
            error: err => ctx.dispatch(new CommentsOfPostsActions.PostFailure(err))
        })
    }
    @Action(CommentsOfPostsActions.PostSuccess)
    postSuccess(ctx: StateContext<CommentsOfPostsStateModel>, {comment}: CommentsOfPostsActions.PostSuccess) {
        const state = ctx.getState()
        const listId = state.commentsOfPostsListId[comment.postOfId]
        ctx.patchState({
            loaded: true,
            loading: false,
            commentsOfPosts: {...state.commentsOfPosts, [comment.id!]: comment},
            commentsOfPostsListId: { [comment.postOfId!]: listId.push(comment.id!), ...state.commentsOfPostsListId,}
        })
    }

    @Action(CommentsOfPostsActions.PostFailure)
    postFailure(ctx: StateContext<CommentsOfPostsStateModel>, {error}: CommentsOfPostsActions.PostFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }
}