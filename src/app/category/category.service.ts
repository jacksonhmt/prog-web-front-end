import { Injectable, ErrorHandler } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from './category';

// Classe de serviço referente a categoria.
@Injectable()
export class CategoryService {

    private API_APPLE = 'http://192.168.1.13:8181/api'

    constructor(private http: Http) { }

    //Recupera todas as categorias registrados na base de dados.
    findAll(): Observable<Category[]> {
        return this.http
            .get(`${this.API_APPLE}/category`)
            .map(response => response.json().content);
    }

    findById(id: number): Observable<Category> {
        return this.http
        .get(`${this.API_APPLE}/category/${id}`)
        .map(response => response.json().content);
    }

    // deleta a categoria da base de dados.
    delete(id: number) {
        return this.http
            .delete(`${this.API_APPLE}/category/${id}`)
            .map(res => res.json().content);
    }

    // Salva a categoria na base de dados.
    save(category: Category): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })

        const body = JSON.stringify(category);

        return this.http.post(`${this.API_APPLE}/category`, body, options)
            .map(response => response.json());
    }
}


