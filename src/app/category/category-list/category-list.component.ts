import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ToastrService } from '../../toastr.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  listaVazia: boolean;
  dtTrigger: Subject<Category> = new Subject();
  selectedIndex: number;
  categorys: Category[];

  constructor(
    private router: Router,
    public categoryService: CategoryService,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  //Retornando Lista
  findAll() {
    this.categoryService.findAll()
      .subscribe(categorys => {
        this.categorys = categorys;
        this.dtTrigger.next();
        this.validationList()
      });

  }

  //Verifica se a lista está vazia
  validationList() {
    if (this.categorys.length == 0) {
      this.listaVazia = true;
    } else {
      this.listaVazia = false;
    }
  }

  //Deletando a categoria atravéz do ID (Excluir Categoria)
  delete(id: number) {
    this.categoryService.delete(id).subscribe(response => {
      this.categorys = [];
      this.findAll();
      this.toastrService.Success('Excluído com sucesso!');
    }, (error) => {
      this.toastrService.Error('Falha ao excluir a categoria! Tente novamente mais tarde!');
    });
  }
}
