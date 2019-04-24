import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ToastrService } from '../../toastr.service'

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
    public productService: ProductService,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  //Realiza a busca dos produtos
  findAll() {
    this.productService.findAll()
      .subscribe(products => {
        this.products = products;
        this.validationList()
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

  //Deletando o produto atravéz do ID (Excluir Produto)
  delete(id: number) {
    this.productService.delete(id).subscribe(response => {
      this.products = [];
      this.findAll();
      this.toastrService.Success('Excluído com sucesso!');
    }, (error) => {
      this.toastrService.Error('Falha ao excluir o produto! Tente novamente mais tarde!');
    });
  }
}
