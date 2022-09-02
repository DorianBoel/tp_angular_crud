import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    uri: string = "";

    constructor(private http: HttpClient) { }

    addProduct(name: string, description: string, price: string) {
        const obj = {
            name, description, price
        };
        console.log(obj);
        this.http.post(`${this.uri}`, obj).subscribe(
            (res) => console.log('Done')
        );
    }

}
