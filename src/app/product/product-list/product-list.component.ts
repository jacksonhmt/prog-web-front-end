import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  
  listaVazia: boolean;
  dtTrigger: Subject<Product> = new Subject();
  selectedIndex: number;
  products: Product[];

  constructor(
    private router: Router,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  //Retornando Lista
  findAll() {
    this.productService.findAll()
      .subscribe(products => {
        this.products = products;
      });
  }

  //Verifica se a lista está vazia
  validationList() {
    if (this.products.length == 0) {
      this.listaVazia = true;
    } else {
      this.listaVazia = false;
    }
  }

  //Deletando a categoria atravéz do ID
  delete(id: number) {
    this.productService.delete(id).subscribe(response => {
      this.products = [];
      this.findAll();
    });
  }
}
