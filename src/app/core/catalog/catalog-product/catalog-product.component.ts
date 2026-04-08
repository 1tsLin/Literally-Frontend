import { Component, inject, Input, OnInit } from '@angular/core';
import { GradeComponent } from '../../../shared/components/grade/grade.component';
import { CatalogProduct } from '../../../shared/interfaces/catalog-product.model';
import { MediaService } from '../../../shared/services/media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-product',
  imports: [GradeComponent],
  templateUrl: './catalog-product.component.html',
  styleUrl: './catalog-product.component.css',
})
export class CatalogProductComponent implements OnInit {
  @Input() product!: CatalogProduct;

  private router = inject(Router);

  productCoverUrl = '/image-placeholder.svg';

  private mediaService = inject(MediaService);

  ngOnInit(): void {
    if (this.product.coverId) {
      this.productCoverUrl = this.mediaService.getMediaUrl(
        this.product.coverId,
      );
    }
  }

  seeDetails() {
    this.router.navigate(['/product/' + this.product.productId]);
  }
}
