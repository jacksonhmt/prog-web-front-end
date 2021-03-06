import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { ToastrService } from '../../toastr.service'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categories: Category[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    public categoryService: CategoryService,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.categoryService.findAll()
    .subscribe(categories => {
      this.categories = categories;
    })

    //validações de campos
    this.productForm = this.builder.group({
      id: [],
      nome: ['', [Validators.required, Validators.maxLength(80)]],
      marca: ['', [Validators.required, Validators.maxLength(60)]],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      preco: ['', [Validators.required, Validators.maxLength(10)]],
      category: ['', [Validators.required, Validators.maxLength(10)]],
    }, {})

    //Busca o produto pelo código (Alterar Produto)
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

  get formFields(){
    return this.productForm.controls;
  }
  
  compareFn(c1: Category, c2: Category): boolean{
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  // Salva o produto (Cadastrar Produto)
  save(product: Product) {
    this.productService.save(product).subscribe(data => {
      this.router.navigate(['/product']);
      this.toastrService.Success('Salvo com sucesso!');
    }, (error) => {
      this.toastrService.Error('Falha ao salvar o produto! Tente novamente mais tarde!');
    });
  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err.message || err)
  }
}

