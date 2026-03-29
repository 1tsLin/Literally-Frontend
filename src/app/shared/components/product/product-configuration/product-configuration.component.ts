import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { SectionHeaderComponent } from '../../section-header/section-header.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { series } from '../../../dummy-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-configuration',
  imports: [
    ReactiveFormsModule,
    SectionHeaderComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-configuration.component.html',
  styleUrl: './product-configuration.component.css',
})
export class ProductConfigurationComponent {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  id?: string;
  series = series;

  heroTitle: String = '(nouveau produit)';
  isGeneralInfoOpen: boolean = false;

  coverImageUrl: SafeUrl | string = '/image-placeholder.svg';
  coverImageFile: File | null = null;
  backImageUrl: SafeUrl | string = '/image-placeholder.svg';
  backImageFile: File | null = null;

  selectedSerieId: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id') ?? undefined;

    if (this.id) {
      // UPDATE
      this.heroTitle = '(id n° ' + this.id + ')';
    } else {
      // CREATE
    }
  }

  onFileChange(event: Event, isCover: boolean): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    isCover ? (this.coverImageFile = file) : (this.backImageFile = file);

    const objectUrl = URL.createObjectURL(file);
    isCover
      ? (this.coverImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl))
      : (this.backImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl));
  }
}
