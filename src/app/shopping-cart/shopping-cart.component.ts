import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { AppComponent } from '../app.component';
import { ShoppingCartService } from './shopping-cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coupon } from './coupon';
import { ToastrService } from '../toastr.service'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  nome: string[] = [];
  aux: string;
  valorTotal: Number = 0;
  couponForm: FormGroup;

  constructor(
    public appComponent: AppComponent,
    private shoppingCartService: ShoppingCartService,
    private builder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.couponForm = this.builder.group({
      id: [],
      name: ['', [Validators.maxLength(10)]],
    }, {})

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
    
    if(localStorage.getItem('desconto') != null) {
      let desconto = parseInt(localStorage.getItem('desconto'));
      valorTotalAux = valorTotalAux - (valorTotalAux * desconto/100); 
      console.log('desconto armazenado: ' + localStorage.getItem('desconto'));
    }

    this.valorTotal = valorTotalAux;
  }

  codDesconto(nomeCod: Coupon) {
    console.log('cupon: ' + typeof nomeCod.name.toString());

    this.shoppingCartService.findCouponByName(nomeCod.name)
    .subscribe( resp => {
      localStorage.setItem('desconto', resp.amount.toString());
      this.precoTotal();
      this.toastrService.Success('Cupom aplicado com sucesso!');
    }, 
    err => {
      this.toastrService.Error('Cupom inválido!');
    })
  }

  limparCodigo() {
    localStorage.removeItem('desconto');
    this.toastrService.Success('Cupom removido com sucesso!');
    this.precoTotal();
  }
}
