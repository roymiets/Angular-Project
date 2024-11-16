import {  ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, CommonModule,NgxPaginationModule,MatSortModule,MatTableModule,MatSort]
})
export class ProductListComponent {
  p: number = 1; 
  total: number | undefined;
  page: number = 1;
  limit: number = 20;
  message: string = '';
  messageType: 'success' | 'error' | null = null;

  productes: Product[] = [];
  selectedProducts: Product[] = [];
  dataSource = new MatTableDataSource(this.productes);

  //@ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;



constructor(private router :Router,private productService:ProductService,private cdr: ChangeDetectorRef){}

products: any[] = [];
  //products: Product[] = [];
  //selectedProducts: Productes[] = [];


ngOnInit(): void {
  this.productService.getProducts(this.page,this.limit).subscribe(data => {
    this.cdr.detectChanges();
    console.log(data); 
    this.products = data.products;
    this.total = data.total;
   // this.dataSource.data = this.productes;
  
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;

  });
  // this.dataSource = new MatTableDataSource(this.products);
  //   this.dataSource.sort = this.sort;
}

addProduct() {
this.router.navigate(['/productform',{ queryParams: { mode: 'add' } }]);
}


editProduct(product: Product): void {
  this.router.navigate(['/productform'], { queryParams: { mode: 'edit', product:product} });
}

// deleteProduct(id: string): void {
//   if (id) {
//     this.productService.deleteProduct(id).subscribe(() => {
//       this.products = this.products.filter(p => p._id !== id);
//     }, error => {
//       console.error('Error deleting product:', error);
//     });
//   } else {
//     console.error('Product ID is undefined');
//   }
// }
deleteProduct(id: string): void {
  if (id) {
    this.productService.deleteProduct(id).subscribe(response => {
      this.products = this.products.filter(p => p._id !== id);
      if (response.message.includes('successfully')) {
        this.setMessage('success', 'Product deleted successfully!');
      } else {
        this.setMessage('error', 'Failed to delete product');
      }
      setTimeout(() => this.clearMessage(), 1000); // Clear message after 1 second
    }, error => {
      console.error('Error deleting product:', error);
      this.setMessage('error', 'Error deleting product');
      setTimeout(() => this.clearMessage(), 1000); // Clear message after 1 second
    });
  } else {
    console.error('Product ID is undefined');
    this.setMessage('error', 'Product ID is undefined');
    setTimeout(() => this.clearMessage(), 1000); // Clear message after 1 second
  }
}


ngDoCheck(): void {
  this.cdr.detectChanges(); // Manually trigger change detection if needed
}

selectAll(event: any) {
  // if (event.target.checked) {
  //   this.selectedProducts = [...this.products];
  // } else {
  //   this.selectedProducts = [];
  // }
}

onSelect(event: any, product: Product) {
  if (event.target.checked) {
    this.selectedProducts.push(product);
  } else {
    this.selectedProducts = this.selectedProducts.filter(p => p !== product);
  }
}
private setMessage(type: 'success' | 'error', text: string) {
  this.messageType = type;
  this.message = text;
}
private clearMessage() {
  this.messageType = null;
  this.message = '';
}
  
}
