import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { GradeComponent } from '../../../shared/components/grade/grade.component';
import { CatalogProduct } from '../../../shared/interfaces/catalog-product.model';
import { MediaService } from '../../../shared/services/media.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FavoriteService } from '../../../shared/services/favorite.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-hightlight-product',
  imports: [GradeComponent, TranslateModule],
  templateUrl: './hightlight-product.component.html',
  styleUrl: './hightlight-product.component.css',
})
export class HightlightProductComponent implements OnInit {
  @Input() product!: CatalogProduct;

  private router = inject(Router);
  private mediaService = inject(MediaService);
  private favoriteService = inject(FavoriteService);
  private cartService = inject(CartService);

  isInFavorites = computed(() =>
    this.favoriteService.isInFavorites(this.product.productId),
  );

  productCoverUrl = '/image-placeholder.svg';

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

  toggleFavorite() {
    this.favoriteService.toggle(this.product.productId);
  }

  addToCart() {
    this.cartService.add(this.product.productId);
  }
}
