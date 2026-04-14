import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interfaces/product.model';
import { SectionHeaderComponent } from '../../section-header/section-header.component';
import { LanguageEnum } from '../../../enums/language.enum';
import { ContributorService } from '../../../services/contributor.service';
import { Contributor } from '../../../interfaces/contributor.model';
import { MediaCategoryEnum } from '../../../enums/media-category.enum';
import { MediaService } from '../../../services/media.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppStateService } from '../../../services/app-state.service';
import { FavoriteService } from '../../../services/favorite.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [SectionHeaderComponent, TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  readonly MediaCategory = MediaCategoryEnum;

  private productService = inject(ProductService);
  private contributorService = inject(ContributorService);
  private mediaService = inject(MediaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private appState = inject(AppStateService);
  private favoriteService = inject(FavoriteService);
  private cartService = inject(CartService);

  private productId = signal<string | undefined>(undefined);
  isInFavorites = computed(() => {
    const id = this.productId();
    return id ? this.favoriteService.isInFavorites(id) : false;
  });

  id?: string;
  product?: Product;
  isDescriptionOpen: boolean = true;
  isDetailsOpen: boolean = true;

  author?: Contributor;
  illustrator?: Contributor;
  editor?: Contributor;

  publishingDate?: string;

  coverImageUrl?: string;
  backImageUrl?: string;
  activeImage: MediaCategoryEnum = MediaCategoryEnum.PRODUCT_COVER;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.id) {
      this.productService.getProduct(this.id).subscribe({
        next: (product) => {
          this.product = product;
          this.productId.set(product.id);
          this.publishingDate = product.publishingDate
            ? new Date(product.publishingDate).toLocaleDateString('fr-FR')
            : undefined;
          if (product.authorId)
            this.contributorService
              .getContributor(product.authorId)
              .subscribe({ next: (author) => (this.author = author) });
          if (product.illustratorId)
            this.contributorService
              .getContributor(product.illustratorId)
              .subscribe({
                next: (illustrator) => (this.illustrator = illustrator),
              });
          if (product.editorId)
            this.contributorService
              .getContributor(product.editorId)
              .subscribe({ next: (editor) => (this.editor = editor) });

          if (product.medias && product.medias.length > 0) {
            product.medias.forEach((media) => {
              if (media.category == MediaCategoryEnum.PRODUCT_COVER)
                this.coverImageUrl = this.mediaService.getMediaUrl(media.id!);
              if (media.category == MediaCategoryEnum.PRODUCT_BACK)
                this.backImageUrl = this.mediaService.getMediaUrl(media.id!);
            });
          }
        },
      });
    } else {
      this.router.navigate(['/error']);
    }
  }

  changeActiveImage(category: MediaCategoryEnum) {
    this.activeImage = category;
  }

  toggleFavorite() {
    if (this.product) this.favoriteService.toggle(this.product.id!);
  }

  addToCart() {
    if (this.product) this.cartService.add(this.product.id!);
  }

  get getDescription() {
    const localization = this.product?.localizations.filter(
      (localization) => localization.language == this.appState.language(),
    )[0];
    return localization?.description;
  }

  get getTitle() {
    const localization = this.product?.localizations.filter(
      (localization) => localization.language == this.appState.language(),
    )[0];
    return localization?.name;
  }
}
