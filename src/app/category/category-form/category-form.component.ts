import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ToastrService } from '../../toastr.service'


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;

  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
    //validações de campos
    this.categoryForm = this.builder.group({
      id: [],
      nome: this.builder.control('', [Validators.required,  Validators.maxLength(50)])
    }, {})

    // Procurar categoria pelo código (Alterar Categoria)
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

  get formFields() {
    return this.categoryForm.controls;
  }


  // Salva a categoria e retorna a lista de categorias (Cadastrar Categoria)
  save(category: Category) {
    this.categoryService.save(category).subscribe(data => {
      this.router.navigate(['/category']);
      this.toastrService.Success('Salvo com sucesso!');
    }, (error) => {
      this.toastrService.Error('Falha ao salvar a categoria! Tente novamente mais tarde!');
    });
  }
}