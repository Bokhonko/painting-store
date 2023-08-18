import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingComponent } from './pages/painting/painting.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category/:name/:id', component: CategoryComponent},
  {path: 'paintings/:id', component: PaintingComponent},
  {path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)},
  {path: 'basket', loadChildren: () => import('./pages/basket/basket.module').then(m => m.BasketModule)},  
  {path: 'careers', loadChildren: () => import('./pages/careers/careers.module').then(m => m.CareersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
