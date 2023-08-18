import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PostCommentComponent } from "src/app/components/post-comment/post-comment.component";
import { PostComponent } from "src/app/components/post/post.component";
import { PostPageComponent } from "../post-page/post-page.component";
import { BlogComponent } from "./blog.component";

@NgModule({
    declarations: [
        BlogComponent,
        PostPageComponent,
        PostComponent,
        PostCommentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: 'blog', component: BlogComponent},
            {path: 'post/:id', component: PostPageComponent}, 
        ])
    ],
    exports: [RouterModule]
})
export class BlogModule{

}