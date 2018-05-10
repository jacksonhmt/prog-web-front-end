import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';

export const ProductRoutes: Routes = [
    { path: '', redirectTo: '/product/list', pathMatch: 'full' },
    { path: 'list', component: ProductListComponent },
    { path: 'form', component: ProductFormComponent },
    { path: 'alter/:id', component: ProductFormComponent },
    { path: 'view/:id', component: ProductViewComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ProductRoutes)
    ],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
