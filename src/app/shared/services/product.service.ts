import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  createProduct(product: Product, coverImage?: File, backImage?: File) {
    const formData = new FormData();

    formData.append(
      'dto',
      new Blob([JSON.stringify(product)], { type: 'application/json' }),
      'dto',
    );

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    if (backImage) {
      formData.append('backImage', backImage);
    }

    return this.http.post<Product>(`${this.apiUrl}/products`, formData);
  }

  updateProduct(productId: string, product: Product) {
    return this.http.put<Product>(
      `${this.apiUrl}/products/${productId}`,
      product,
    );
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${productId}`);
  }
}
