import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  
  categoryForm: FormGroup;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder,

  ) { }

  ngOnInit() {
    //validações de campos
    this.categoryForm = this.builder.group({
      id: [],
      nome: ['', [Validators.required, Validators.maxLength(50)]],
    }, {})

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

  // Salva a categoria e retorna a lista de categorias
  save(category: Category) {
    this.categoryService.save(category).subscribe(data => {
      this.router.navigate(['/category']);
    })
  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err.message || err)
  }
}

