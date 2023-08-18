import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Selector, createSelector, Select } from '@ngxs/store';
import { IPainting, PaintingsService } from 'src/app/services/paintings.service';
import { CategoriesService } from 'src/app/services/categories.service';
import * as PaintingsActions from '../actions/painting.actions'

export interface PaintingsStateModel {
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly paintings: Record<string, IPainting>;
    readonly categoryId: Record<string, number[]>;
    readonly search: string;
}

export const initialPaintingsState: PaintingsStateModel = {
    paintings: {},
    categoryId: {},
    search: '',
    loaded: false,
    loading: false
}

@State<PaintingsStateModel>({
    name: 'paintings',
    defaults: initialPaintingsState
})

@Injectable()
export class PaintingsState implements NgxsOnInit {
    paintingOfId = new Set()

    @Selector()
    static selectPaintings(state:PaintingsStateModel): IPainting[] {
        return Object.values(state.paintings)
    }

    // @Selector()
    // static paintingOfCategory(state:PaintingsStateModel) {
    //     return (id: number) => {
    //         return state.categoryId[id].map(id => state.paintings[id])
    //     }
    // }
    @Selector()
    static paintingOfCategory(state:PaintingsStateModel) {
        return (id: number) => {
            const paintings = state.categoryId[id]?.map(id => state.paintings[id])
            if(state.search) {
                return paintings.filter((p)=> p.name.toLowerCase().includes(state.search.toLowerCase()))
            } else {
                return paintings
            }
        }
    }

    @Selector()
    static paintingOfId(state:PaintingsStateModel) {
        return (id: number) => {
            return state.paintings[id]
        }
    }

    constructor(private paintingsService: PaintingsService){}
    ngxsOnInit(ctx: StateContext<PaintingsStateModel>): void {
        ctx.dispatch(new PaintingsActions.Get())
    }
    
    @Action(PaintingsActions.Get)
    load(ctx: StateContext<PaintingsStateModel>) {
        ctx.patchState({
            loading: true,
            loaded: false
        })
        this.paintingsService.getPaintings().subscribe({
            next: res => ctx.dispatch(new PaintingsActions.GetSuccess(res)),
            error: err => ctx.dispatch(new PaintingsActions.GetFailure(err))
        })
    }

    @Action(PaintingsActions.GetSuccess)
    loadSuccess(ctx: StateContext<PaintingsStateModel>, {paintings}: PaintingsActions.GetSuccess) {
        const paintingsById: Record<string, IPainting> = {}
        const paintingsByCategories: Record<string, number[]> = {}
        paintings.forEach((painting) => paintingsById[painting.id] = painting)

        paintings.forEach(painting => {
            if (paintingsByCategories[painting.categoryId]) {
              paintingsByCategories[painting.categoryId].push(painting.id)
            } else {
              paintingsByCategories[painting.categoryId] = [painting.id]
            }
        })
        ctx.patchState({
            loaded: true,
            loading: false,
            paintings: paintingsById,
            categoryId: paintingsByCategories   
        })
    }

    @Action(PaintingsActions.GetFailure)
    loadFailure(ctx: StateContext<PaintingsStateModel>, {error}: PaintingsActions.GetFailure) {
        ctx.patchState({
            loaded: false,
            loading: false
        })
    }
    @Action(PaintingsActions.Search)
        search(ctx: StateContext<PaintingsStateModel>, {search}: PaintingsActions.Search) {
        // const state = ctx.getState();
        
        // const filtered = Object.values(state.paintings).filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        ctx.patchState({
            search: search
        });
    }
}