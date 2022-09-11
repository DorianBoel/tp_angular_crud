import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html', styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

    angForm!: FormGroup;
    alert = {
        active: false,
        productName: "",
        productId: 0
    };

    constructor(private formBuilder: FormBuilder, private productService: ProductService) {
        this.createForm();
    }

    ngOnInit() { }

    createForm(): void {
        this.angForm = this.formBuilder.group({
            ProductName: ['', Validators.compose(
                    [
                        Validators.required,
                        Validators.maxLength(100)
                    ]
                )],
            ProductDescription: ['', Validators.compose(
                    [
                        Validators.required,
                        Validators.maxLength(1000)
                    ]
                )],
            ProductPrice: [0, Validators.compose(
                [
                    Validators.required,
                    Validators.min(0)
                ]
            )]
        });
    }

    addProduct(name: string, description: string, price: string) {
        this.productService.addProduct(name, description, price).subscribe(
            (res) => {
                let response = res as Product;
                this.alert.active = true;
                this.alert.productName = response.name;
                this.alert.productId = response.id;
                this.angForm.reset();
            }
        );
    }

}
