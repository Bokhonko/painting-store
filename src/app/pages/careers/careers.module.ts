import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CareersComponent } from "./careers.component";

@NgModule({
    declarations: [
        CareersComponent
    ],
    imports: [
        RouterModule.forChild([
            {path: '', component: CareersComponent}
        ])
    ],
    exports: [RouterModule]
})
export class CareersModule{

}