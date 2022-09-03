import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './model/product';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    uri: string = `http://${env.jsonServer.host}:${env.jsonServer.port}/products`;

    constructor(private http: HttpClient) {
        console.log(this.uri);

    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.uri}`);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.uri}/${id}`);
    }

    addProduct(name: string, description: string, price: string) {
        const obj: Record<string, string> = {
            name,
            description,
            price
        };
        this.http.post(`${this.uri}`, obj).subscribe(
            (res) => console.log('Done')
        );
    }

    updateProduct(name: string, description: string, price: string, id: number): Observable<Product> {
        const obj = {
            id,
            name,
            description,
            price
        };
        return this.http.put<Product>(`${this.uri}/${id}`, obj);
    }


    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(`${this.uri}/${id}`);
    }


}
