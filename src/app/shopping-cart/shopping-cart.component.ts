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
  constructor(
    public appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.lista();
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
  }
}
