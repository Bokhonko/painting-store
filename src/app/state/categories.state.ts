import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Selector, createSelector } from '@ngxs/store';
import * as CategoriesActions from '../actions/categories.actions'
import { CategoriesService, ICategory } from '../services/categories.service';

export interface CategoriesStateModel {
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly categories:  Record<string, ICategory>;
}

export const initialCategoriesState: CategoriesStateModel = {
    categories: {},
    loaded: false,
    loading: false
}

@State<CategoriesStateModel>({
    name: 'category',
    defaults: initialCategoriesState
})

@Injectable()
export class CategoriesState implements NgxsOnInit {
    @Selector()
    static selectCategories(state:CategoriesStateModel): ICategory[] {
        return Object.values(state.categories)
    }
    @Selector()
    static categoryPainting(state:CategoriesStateModel) {
        return (id: number) => {
            return state.categories[id]
        }
    }


    constructor(private categoriesService: CategoriesService) {}
    ngxsOnInit(ctx: StateContext<CategoriesStateModel>): void {
        ctx.dispatch(new CategoriesActions.Get())
    }
    
    @Action(CategoriesActions.Get)
    load(ctx: StateContext<CategoriesStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.categoriesService.getCategories().subscribe({
            next: res => ctx.dispatch(new CategoriesActions.GetSuccess(res)),
            error: err => ctx.dispatch(new CategoriesActions.GetFailure(err))
        })
    }

    // @Action(CategoriesActions.GetSuccess)
    // loadSuccess(ctx: StateContext<CategoriesStateModel>, {categories}: CategoriesActions.GetSuccess) {
    //     ctx.patchState({
    //         loaded: true,
    //         loading: false,
    //         categories: categories
    //     })
    // }
    @Action(CategoriesActions.GetSuccess)
    loadSuccess(ctx: StateContext<CategoriesStateModel>, {categories}: CategoriesActions.GetSuccess) {
        const categoriesById: Record<string, ICategory> = {}
        categories.forEach((category) => categoriesById[category.id] = category)
        ctx.patchState({
            loaded: true,
            loading: false,
            categories: categoriesById
        })
    }


    @Action(CategoriesActions.GetFailure)
    loadFailure(ctx: StateContext<CategoriesStateModel>, {error}: CategoriesActions.GetFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }
}