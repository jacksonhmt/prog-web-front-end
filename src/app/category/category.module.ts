import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser/src/browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CategoryRoutingModule } from './category-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryViewComponent } from './category-view/category-view.component';

import { CategoryService } from './category.service';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent,
    CategoryViewComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    RouterModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ],
  providers: [
    CategoryService
  ],
})
export class CategoryModule { }
