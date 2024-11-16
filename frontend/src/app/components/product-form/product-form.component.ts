import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  standalone:true,
  imports:[FormsModule,CommonModule,ReactiveFormsModule]
})

export class ProductFormComponent {

  productForm!: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' = 'error';
  product: any;
  productId: string | undefined;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private productService:ProductService,
    private route: ActivatedRoute,
  private router:Router) { }

  heading: string = 'Add Product';
  buttonText: string = 'Submit';


  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productSize: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      img: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required]
    });
  
    this.route.queryParams.subscribe(params => {
      const mode = params['mode'];
      if (mode === 'edit') {
        this.heading = 'Edit Product';
        this.buttonText = 'Update';
        this.productId = params['product'].replace(/"/g, ''); // Remove quotes
        if (this.productId) {
          this.productService.getProductById(this.productId.toString()).subscribe(product => {
            console.log(product);
            this.productForm.patchValue(product);
          });
        }
      } else {
        this.heading = 'Add Product';
        this.buttonText = 'Submit';
      }
    });
  }
  
//only adding purpose
  // onSubmit(): void {
  //   if (this.productForm.valid) {
  //     // Add new product
  //     this.productService.addProduct(this.productForm.value).subscribe(
  //       response => {
  //         this.messageType = 'success';
  //         this.message = 'Product details added successfully!';
  //         setTimeout(() => {
  //           this.router.navigate(['/productlist']);
  //         }, 3000);
  //       },
  //       error => {
  //         this.messageType = 'error';
  //         this.message = 'Insertion failed: ' + error.error.message;
  //       }
  //     );
  //   } else {
  //     this.messageType = 'error';
  //     this.message = 'Form is invalid';
  //   }
  // }

  //updating and adding purpose

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.productId) {
        console.log(this.productId)
        // Update existing product
        this.productService.updateProduct(this.productId, this.productForm.value).subscribe(
          response => {
            this.messageType = 'success';
            this.message = 'Product details updated successfully!';
            setTimeout(() => {
              this.router.navigate(['/productlist']);
            }, 3000);
          },
          error => {
            this.messageType = 'error';
            this.message = 'Update failed: ' + error.error.message;
          }
        );
      } else {
        // Add new product
        this.productService.addProduct(this.productForm.value).subscribe(
          response => {
            this.messageType = 'success';
            this.message = 'Product details added successfully!';
            setTimeout(() => {
              this.router.navigate(['/productlist']);
            }, 3000);
          },
          error => {
            this.messageType = 'error';
            this.message = 'Insertion failed: ' + error.error.message;
          }
        );
      }
    } else {
      this.messageType = 'error';
      this.message = 'Form is invalid';
    }
  }

  
  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
    }
  
}

