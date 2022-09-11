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

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.uri}`);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.uri}/${id}`);
    }

    addProduct(name: string, description: string, price: string): Observable<object> {
        let response: string | null = null;
        const obj: Record<string, string> = {
            name,
            description,
            price
        };
        return this.http.post(`${this.uri}`, obj);
    }

    updateProduct(name: string, description: string, price: string, id: number): Observable<Product> {
        const obj: Product = {
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
