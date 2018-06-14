import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tamanho:number = 0;
  constructor() { }

  ngOnInit() {
    this.atualizaNumero();
  }

  atualizaNumero(){
    let produtos = localStorage.getItem("produtos") ?
      JSON.parse(localStorage.getItem("produtos")) :
      [];

    let quantidadeDeProdutos = 0;

    for (let i = 0; i < produtos.length; i++) {
      quantidadeDeProdutos = quantidadeDeProdutos + produtos[i].quantidade; 
    }

    this.tamanho = quantidadeDeProdutos;
  }
}