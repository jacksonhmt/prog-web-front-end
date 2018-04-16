import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
})

export class CategoryViewComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.category = new Category();
    this.category.id = this.route.snapshot.params['id'];

    //validações de campos
    this.categoryForm = this.builder.group({
      id: [],
      nome: ['', [Validators.required, Validators.maxLength(50)]],
    }, {})

    // Busca no banco através do ID
    this.findCategoryView();
  }

  // Encontrado categoria pelo ID para visualização
  findCategoryView(){
    this.route.params.forEach((params: Params) => {
      let id: number = +params['id'];
      if (id) {
        this.categoryService.findById(id)
          .subscribe((category: Category) => {
            this.categoryForm.patchValue(category);
          });
      }
    })
  }
}

