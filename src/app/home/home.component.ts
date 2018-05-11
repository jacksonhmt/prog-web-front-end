import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
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
  
  findAll() {
    this.productService.findAll()
      .subscribe(products => {
        this.products = products;
      });
  }
}
