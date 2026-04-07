import { Component, inject, Input, OnInit } from '@angular/core';
import { GradeComponent } from '../../../shared/components/grade/grade.component';
import { CatalogProduct } from '../../../shared/interfaces/catalog-product.model';
import { MediaService } from '../../../shared/services/media.service';

@Component({
  selector: 'app-hightlight-product',
  imports: [GradeComponent],
  templateUrl: './hightlight-product.component.html',
  styleUrl: './hightlight-product.component.css',
})
export class HightlightProductComponent implements OnInit {
  @Input() product!: CatalogProduct;

  productCoverUrl = '/image-placeholder.svg';

  private mediaService = inject(MediaService);

  ngOnInit(): void {
    if (this.product.coverId) {
      this.productCoverUrl = this.mediaService.getMediaUrl(
        this.product.coverId,
      );
    }
  }
}
