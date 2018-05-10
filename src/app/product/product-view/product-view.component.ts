import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
})

export class ProductViewComponent implements OnInit {

  productForm: FormGroup;
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.product = new Product();
    this.product.id = this.route.snapshot.params['id'];

    //validações de campos
    this.productForm = this.builder.group({
      id: [],
      nome: ['', [Validators.required, Validators.maxLength(80)]],
      marca: ['', [Validators.required, Validators.maxLength(60)]],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      preco: ['', [Validators.required, Validators.maxLength(10)]],
    }, {})

    // Busca no banco através do ID
    this.findProductView();
  }

  // Encontrado categoria pelo ID para visualização
  findProductView(){
    this.route.params.forEach((params: Params) => {
      let id: number = +params['id'];
      if (id) {
        this.productService.findById(id)
          .subscribe((product: Product) => {
            this.productForm.patchValue(product);
          });
      }
    })
  }
}

