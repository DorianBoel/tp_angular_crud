import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html', styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

    angForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private productService: ProductService) {
        this.createForm();
    }

    ngOnInit() { }

    createForm(): void {
        this.angForm = this.formBuilder.group({
            ProductName: ['', Validators.required],
            ProductDescription: ['', Validators.required],
            ProductPrice: ['', Validators.required]
        });
    }

    addProduct(name: string, description: string, price: string) {
        this.productService.addProduct(name, description, price);
    }

}
