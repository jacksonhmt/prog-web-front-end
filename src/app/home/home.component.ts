import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { AppComponent } from '../app.component';
import { ToastrService } from '../toastr.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  dtTrigger: Subject<Product> = new Subject();
  selectedIndex: number;
  products: Product[];
  productLocalStorage: Product[];

  constructor(
    private router: Router,
    public productService: ProductService,
    public appComponent: AppComponent,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  enviandoAoCarrinho(produto) {
    let produtos = localStorage.getItem("produtos") ?
      JSON.parse(localStorage.getItem("produtos")) :
      [];

    let item = {
      produto: produto,
      index: produtos.length + 1,
      quantidade: 1,
      valorUnitario: 0
    }

    var teste = true;

    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i].produto.id == item.produto.id) {
        produtos[i].produto.preco = produtos[i].produto.preco + item.produto.preco;
        produtos[i].quantidade = produtos[i].quantidade + 1;
        localStorage.setItem("produtos", JSON.stringify(produtos));
        teste = false;
      }
    }

    item.valorUnitario = produto.preco;

    if (teste) {
      produtos.push(item);
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));
    this.appComponent.atualizaNumero();
    this.toastrService.Success('Produto adicionado no carrinho!');
  }

  findAll() {
    this.productService.findAll()
      .subscribe(products => {
        this.products = products;
      });
  }
}