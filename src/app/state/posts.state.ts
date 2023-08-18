import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Selector } from '@ngxs/store';
import { IPost, PostsService } from '../services/posts.service';
import * as PostsActions from '../actions/posts.action'


export interface PostsStateModel {
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly posts: Record<string, IPost>;
    readonly categoryId: Record<string, number[]>;
}

export const initialPostsState: PostsStateModel = {
    posts: {},
    categoryId: {},
    loaded: false,
    loading: false
}

@State<PostsStateModel>({
    name: 'posts',
    defaults: initialPostsState
})

@Injectable()
export class PostsState implements NgxsOnInit {
    postsOfId = new Set()

    @Selector()
    static selectPosts(state:PostsStateModel): IPost[] {
        return Object.values(state.posts)
    }

    @Selector()
    static postOfCategory(state:PostsStateModel) {
        return (id: number) => {
            return state.categoryId[id].map(id => state.posts[id])
        }
    }

    @Selector()
    static postOfId(state:PostsStateModel) {
        return (id: number) => {
            return state.posts[id]
        }
    }

    constructor(private postsService: PostsService){}

    ngxsOnInit(ctx: StateContext<PostsStateModel>): void {
        ctx.dispatch(new PostsActions.Get())
    }
    
    @Action(PostsActions.Get)
    load(ctx: StateContext<PostsStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.postsService.getPosts().subscribe({
            next: res => ctx.dispatch(new PostsActions.GetSuccess(res)),
            error: err => ctx.dispatch(new PostsActions.GetFailure(err))
        })
    }

    @Action(PostsActions.GetSuccess)
    loadSuccess(ctx: StateContext<PostsStateModel>, {posts}: PostsActions.GetSuccess) {
        const postsById: Record<string, IPost> = {}
        const postsByCategories: Record<string, number[]> = {}
        posts.forEach((post) => postsById[post.id] = post)

        posts.forEach(post => {
            if (postsByCategories[post.categoryId]) {
              postsByCategories[post.categoryId].push(post.id)
            } else {
              postsByCategories[post.categoryId] = [post.id]
            }
        })
        ctx.patchState({
            loaded: true,
            loading: false,
            posts: postsById,
            categoryId: postsByCategories   
        })
    }

    @Action(PostsActions.GetFailure)
    loadFailure(ctx: StateContext<PostsStateModel>, {error}: PostsActions.GetFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }
}