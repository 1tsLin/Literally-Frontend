import { Component, inject, Input, OnInit } from '@angular/core';
import { GradeComponent } from '../../../shared/components/grade/grade.component';
import { CatalogProduct } from '../../../shared/interfaces/catalog-product.model';
import { MediaService } from '../../../shared/services/media.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hightlight-product',
  imports: [GradeComponent, TranslateModule],
  templateUrl: './hightlight-product.component.html',
  styleUrl: './hightlight-product.component.css',
})
export class HightlightProductComponent implements OnInit {
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
