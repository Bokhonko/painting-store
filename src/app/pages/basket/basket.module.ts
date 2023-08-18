import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BasketComponent } from "./basket.component";

@NgModule({
    declarations: [
        BasketComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: BasketComponent}
        ])
    ],
    exports: [RouterModule]
})
export class BasketModule{

}