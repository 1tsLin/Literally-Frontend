import { Component, inject, Input, OnInit } from '@angular/core';
import { GradeComponent } from '../../../shared/components/grade/grade.component';
import { CatalogProduct } from '../../../shared/interfaces/catalog-product.model';
import { MediaService } from '../../../shared/services/media.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartItem, CartService } from '../../../shared/services/cart.service';
import { CommonModule } from '@angular/common';

export type CartProduct = CatalogProduct & CartItem;

@Component({
  selector: 'app-cart-product',
  imports: [GradeComponent, TranslateModule, CommonModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent implements OnInit {
  @Input() product!: CartProduct;

  private router = inject(Router);
  private mediaService = inject(MediaService);
  private cartService = inject(CartService);

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

  remove() {
    this.cartService.remove(this.product.productId);
  }
}
