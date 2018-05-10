import { Injectable, ErrorHandler } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Product } from './product';
// import { API_APPLE } from './../app.api';

@Injectable()
export class ProductService {

    constructor(private http: Http) { }

    findAll(): Observable<Product[]> {
        return this.http
            .get(`http://localhost:8181/api/product`)
            .map(response => response.json().content);
    }

    findById(id: number): Observable<Product> {
        return this.http
        .get(`http://localhost:8181/api/product/${id}`)
        .map(response => response.json().content);
    }

    delete(id: number) {
        return this.http
            .delete(`http://localhost:8181/api/product/${id}`)
            .map(res => res.json().content);
    }

    save(product: Product): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })

        const body = JSON.stringify(product);

        return this.http.post(`http://localhost:8181/api/product`, body, options)
            .map(response => response.json());
    }
}


