import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/Products`);
  // }
  getProducts(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products?page=${page}&limit=${limit}`);
  }
  
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addProducts`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateProducts/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteProducts/${id}`);
  }
  
}
