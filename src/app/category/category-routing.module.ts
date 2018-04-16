import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryViewComponent } from './category-view/category-view.component';

export const CategoryRoutes: Routes = [
    { path: '', redirectTo: '/category/list', pathMatch: 'full' },
    { path: 'list', component: CategoryListComponent },
    { path: 'form', component: CategoryFormComponent },
    { path: 'alter/:id', component: CategoryFormComponent },
    { path: 'view/:id', component: CategoryViewComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(CategoryRoutes)
    ],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
