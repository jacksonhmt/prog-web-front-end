import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product/product.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from './toastr.service';
import { ModalExclusaoComponent } from './modal-exclusao/modal-exclusao.component'


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    PageNotFoundComponent,
    ShoppingCartComponent,
    ModalExclusaoComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
  ProductService,
  ShoppingCartService,
  ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
