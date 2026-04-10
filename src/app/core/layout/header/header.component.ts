import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CatalogFilterService } from '../../../shared/services/catalog-filter.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule, FormsModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private filterService = inject(CatalogFilterService);
  private router = inject(Router);

  filters = this.filterService.filters;

  searchInput?: string;

  search(): void {
    this.filterService.updateFilters({
      title: this.searchInput,
    });
    this.router.navigate(['/catalog']);
  }
}
