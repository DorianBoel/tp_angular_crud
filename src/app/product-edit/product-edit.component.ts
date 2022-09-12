import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    angForm!: FormGroup;
    product: Product = {
        id: 0,
        name: "",
        description: "",
        price: 0
    };

    constructor(private formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
        this.createForm();
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.productService.getProduct(params['id']).subscribe((res) => {
                this.product = res as Product;
            });
        });
    }

    createForm() {
        this.angForm = this.formBuilder.group({
            ProductName: [this.product.name, Validators.maxLength(100)],
            ProductDescription: [this.product.description, Validators.maxLength(1000)],
            ProductPrice: [this.product.price, Validators.min(0)]
        });
    }

    updateProduct(name: string, description: string, price: string) {
        this.route.params.subscribe((params) => {
            let nameValue: string = name.trim() || this.product.name;
            let descriptionValue: string = description.trim() || this.product.description;
            let priceValue: number = Number.parseFloat(price) || this.product.price;
            this.productService.updateProduct(nameValue, descriptionValue, priceValue, params.id).subscribe(
                (res) => {
                    this.router.navigate(['products']);
                }
            )
        });
    }

}
