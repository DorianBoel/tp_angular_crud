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
    product: any = {};

    constructor(private formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
        this.createForm();
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.productService.editProduct(params['id']).subscribe((res) => {
                this.product = res;
            });
        });
    }

    createForm() {
        this.angForm = this.formBuilder.group({
            ProductName: ['', Validators.required ],
            ProductDescription: ['', Validators.required ],
            ProductPrice: ['', Validators.required ]
        });
    }

    updateProduct(name: string, description: string, price: string) {
        this.route.params.subscribe((params) => {
            this.productService.updateProduct(name, description, price, params.id).subscribe(
                (data) => this.router.navigate(['products'])
            )
        });
    }

}
