import { Injectable, ErrorHandler } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Coupon } from './coupon';

import { API_APPLE } from './../app.api';

@Injectable()
export class ShoppingCartService {

    constructor(private http: Http) { }

    findCouponByName(couponName: string): Observable<Coupon> {
        return this.http
        .get(`${API_APPLE}/coupon/${couponName}`)
        .map(response => response.json().content )
    }
}

