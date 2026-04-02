import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.model';
import { LanguageEnum } from '../enums/language.enum';
import { CatalogProduct } from '../interfaces/catalog-product.model';
import { CatalogFilter } from '../interfaces/catalog-filter.model';

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

  getCatalogProducts(language: LanguageEnum) {
    return this.http.get<CatalogProduct[]>(
      `${this.apiUrl}/products?language=${language}`,
    );
  }

  getCatalog(
    language: string,
    filters?: CatalogFilter,
  ): Observable<CatalogProduct[]> {
    let params = new HttpParams().set('language', language);

    if (filters) {
      if (filters.title) params = params.set('title', filters.title);
      if (filters.price) params = params.set('price', filters.price.toString());
      if (filters.authorId) params = params.set('authorId', filters.authorId);
      if (filters.seriesId) params = params.set('seriesId', filters.seriesId);

      filters.formats?.forEach((f) => (params = params.append('formats', f)));
      filters.genres?.forEach((g) => (params = params.append('genres', g)));
      filters.audiences?.forEach(
        (a) => (params = params.append('audiences', a)),
      );
    }

    return this.http.get<CatalogProduct[]>(
      `${this.apiUrl}/products?language=${language}`,
      { params },
    );
  }
}
