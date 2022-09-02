import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './model/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    uri: string = "";

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product> {
        return this.http.get<Product>(`${this.uri}`);
    }

    addProduct(name: string, description: string, price: string) {
        const obj: Record<string, string> = {
            name,
            description,
            price
        };
        console.log(obj);
        this.http.post(`${this.uri}`, obj).subscribe(
            (res) => console.log('Done')
        );
    }

}
