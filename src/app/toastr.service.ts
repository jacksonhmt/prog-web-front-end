import { Injectable } from '@angular/core';
declare var toastr: any

@Injectable()
export class ToastrService {
    constructor () {}

    Success(title : string, message?:string){
        toastr.success(title, message);
    }

    Error (message: string, title?:string){
        toastr.error(message,title);
    }
}