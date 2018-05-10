import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  
  productForm: FormGroup;
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder,

  ) { }

  ngOnInit() {
    //validações de campos
    this.productForm = this.builder.group({
      id: [],
      nome: ['', [Validators.required, Validators.maxLength(80)]],
      marca: ['', [Validators.required, Validators.maxLength(60)]],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      preco: ['', [Validators.required, Validators.maxLength(10)]],
    }, {})

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

  // Salva a categoria e retorna a lista de categorias
  save(product: Product) {
    this.productService.save(product).subscribe(data => {
      this.router.navigate(['/product']);
    })
  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err.message || err)
  }
}

