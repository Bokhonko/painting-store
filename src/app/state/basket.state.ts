import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Selector, createSelector } from '@ngxs/store';
import { BasketService } from 'src/app/services/basket.service';
import { IPainting } from 'src/app/services/paintings.service';
import * as BasketActions from '../actions/basket.actions'

export interface BasketStateModel {
    readonly paintings:  IPainting[];
}

@State<BasketStateModel>({
    name: 'basket',
    defaults: {
        paintings: []
    }
})

@Injectable()
export class BasketState implements NgxsOnInit {
    @Selector()
    static selectPaintings(state:BasketStateModel): IPainting[] {
        return state.paintings
    }

    @Selector()
    static numberOfPaintings(state:BasketStateModel): number {
        return state.paintings.length
    }

    @Selector()
    static paintingNamesInBasket(state: BasketStateModel): string{
        const names = state.paintings.map(painting => `${painting.name}`)
        return names.join(', ')
    }

    @Selector()
    static allSum(state: BasketStateModel): number{
        let sum = 0 
        state.paintings.map(painting => sum += painting.price)
        return sum
    }

    @Selector()
    static isPaintingInBasket(state:BasketStateModel) {
        return (id: number) => {
            return state.paintings.some(p => p.id === id)
        }
    }

    constructor(private basketService: BasketService) {}

    ngxsOnInit(ctx: StateContext<BasketStateModel>): void {
        ctx.dispatch(new BasketActions.Get())
    }

    @Action(BasketActions.Get)
    get(ctx: StateContext<BasketStateModel>) {
        const paintings = this.basketService.getBasket()

        ctx.patchState({
          paintings: paintings
        })
    }

    @Action(BasketActions.Add)
    add(ctx: StateContext<BasketStateModel>, { painting }: BasketActions.Add) {
  
      const paintings = [...ctx.getState().paintings, painting]
  
      ctx.patchState({
        paintings: paintings
      })
  
      this.basketService.addToBasket(paintings)
    }

    @Action(BasketActions.Delete)
    delete(ctx: StateContext<BasketStateModel>, { id }: BasketActions.Delete) {
  
      const paintings = ctx.getState().paintings.filter(painting => painting.id != id)
  
      ctx.patchState({
        paintings : paintings
      })
  
      this.basketService.addToBasket(paintings)
    }
}