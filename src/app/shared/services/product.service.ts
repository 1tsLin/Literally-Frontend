import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContributorCategoryEnum } from '../enums/contributor-category.enum';
import { Contributor } from '../interfaces/contributor.model';
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

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log(this.apiUrl);
    return this.http.post<Product>(`${this.apiUrl}/products`, formData);
  }

  getContributors(
    category?: ContributorCategoryEnum,
  ): Observable<Contributor[]> {
    let params = new HttpParams();

    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<Contributor[]>(`${this.apiUrl}/contributors`, {
      params,
    });
  }
}
