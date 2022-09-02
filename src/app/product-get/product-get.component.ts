import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-get',
    templateUrl: './product-get.component.html',
    styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

    products: Product[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe((data: Product) => {
            this.products.push(data);
        });
    }

}
