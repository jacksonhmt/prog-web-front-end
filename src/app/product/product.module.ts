import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser/src/browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { TextMaskModule } from 'angular2-text-mask';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductViewComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    RouterModule,
    TextMaskModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ],
  providers: [
    ProductService,
    CategoryService
  ],
})
export class ProductModule { }
