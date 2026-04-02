import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ContributorCategoryEnum } from '../enums/contributor-category.enum';
import { Contributor } from '../interfaces/contributor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContributorService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

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
