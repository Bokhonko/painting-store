import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaintingsComponent } from './components/paintings/paintings.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { PaintingComponent } from './pages/painting/painting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './pages/category/category.component'
import { NgxsModule } from '@ngxs/store';
import { BasketState } from './state/basket.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { CategoriesState } from './state/categories.state';
import { PaintingsState } from './state/paintings.state';
import { ReviewsOfPaintingsState } from './state/reviews-of-paintings.state';
import { ReviewsState } from './state/reviews.state';
import { BlogModule } from './pages/blog/blog.module';
import { PostsState } from './state/posts.state';
import { CommentsOfPostsState } from './state/comments-of-posts.state';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    PaintingsComponent,
    TooltipDirective,
    PhoneNumberPipe,
    HeaderComponent,
    FormComponent,
    HomeComponent,
    PaintingComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    ReactiveFormsModule,
    NgbModule,
    NgxsModule.forRoot([BasketState, CategoriesState, PaintingsState, ReviewsOfPaintingsState, ReviewsState, PostsState, CommentsOfPostsState]),
    NgxsLoggerPluginModule.forRoot(),
    BlogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
