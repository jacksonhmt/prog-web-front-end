import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  nome: string[] = [];
  aux: string;
  valorTotal: Number = 0;

  constructor(
    public appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.lista();
    this.precoTotal();
  }

  lista() {
    return localStorage.getItem("produtos") ?
      JSON.parse(localStorage.getItem("produtos")) :
      [];
  }

  delete(i) {
    let produtos = localStorage.getItem("produtos") ?
      JSON.parse(localStorage.getItem("produtos")) :
      [];

    produtos = produtos.filter(p => p.index !== i);

    localStorage.setItem("produtos", JSON.stringify(produtos));
    this.lista();
    this.appComponent.atualizaNumero();
    this.precoTotal();
  }

  atualizandoItem(produto, valor) {
    let produtos = localStorage.getItem("produtos") ?
      JSON.parse(localStorage.getItem("produtos")) :
      [];

    for (let i = 0; i < produtos.length; i++) {
      if (produtos[i].produto.id == produto.id) {
        if (produtos[i].quantidade > 1 || valor == 1) {
          if (valor == 0) {
            produtos[i].produto.preco = produtos[i].produto.preco - (produtos[i].produto.preco / produtos[i].quantidade);
            produtos[i].quantidade = produtos[i].quantidade - 1;
          } else {
            produtos[i].produto.preco = produtos[i].produto.preco + (produtos[i].produto.preco / produtos[i].quantidade);
            produtos[i].quantidade = produtos[i].quantidade + 1;
          }
          localStorage.setItem("produtos", JSON.stringify(produtos));
        } else {
          break;
        }
      }
    }
    this.appComponent.atualizaNumero();
    this.precoTotal();
  }

  precoTotal() {
    let produtos = localStorage.getItem("produtos") ?
      JSON.parse(localStorage.getItem("produtos")) :
      [];

    let valorTotalAux = 0;

    for (let i = 0; i < produtos.length; i++) {
      valorTotalAux = valorTotalAux + produtos[i].produto.preco;
    }

    this.valorTotal = valorTotalAux;
  }
}
