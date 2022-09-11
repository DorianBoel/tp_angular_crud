import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-get',
    templateUrl: './product-get.component.html',
    styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

    private fragment: string | null = "";
    products: Product[] = [];

    constructor(private productService: ProductService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
        this.productService.getAllProducts().subscribe((data: Product[]) => {
            this.products = data;
        });
    }

    ngAfterViewChecked(): void {
        try {
            document.querySelector('#' + this.fragment)!.scrollIntoView();
        } catch (e) { }
    }

    deleteProduct(product: Product) {
        this.productService.deleteProduct(product.id).subscribe(
            (res) => {
                let idx = this.products.indexOf(product);
                this.products.splice(idx, 1);
            }
        );
    }

}
