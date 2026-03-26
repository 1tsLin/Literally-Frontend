import { Component } from '@angular/core';
import { FilterTypeEnum } from '../../../shared/enums/filter-type.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradeComponent } from '../../../shared/components/grade/grade.component';

@Component({
  selector: 'app-catalog-filters',
  imports: [CommonModule, FormsModule, GradeComponent],
  templateUrl: './catalog-filters.component.html',
  styleUrl: './catalog-filters.component.css',
})
export class CatalogFiltersComponent {
  readonly FilterTypeEnum = FilterTypeEnum;

  filterState: Record<FilterTypeEnum, boolean> = {
    [FilterTypeEnum.PRICE]: false,
    [FilterTypeEnum.COLLECTION]: false,
    [FilterTypeEnum.GRADE]: false,
    [FilterTypeEnum.FORMAT]: false,
    [FilterTypeEnum.GENRE]: false,
    [FilterTypeEnum.AUDIENCE]: false,
    [FilterTypeEnum.CONTRIBUTOR]: false,
  };
  filterTypes = Object.values(FilterTypeEnum);

  selectedPrice = 150;
  selectedGrade?: number;

  updateFilterUI(type: FilterTypeEnum) {
    this.filterState[type] = !this.filterState[type];
  }
}
