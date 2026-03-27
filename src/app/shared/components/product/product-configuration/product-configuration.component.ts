import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { SectionHeaderComponent } from '../../section-header/section-header.component';

@Component({
  selector: 'app-product-configuration',
  imports: [ReactiveFormsModule, SectionHeaderComponent],
  templateUrl: './product-configuration.component.html',
  styleUrl: './product-configuration.component.css',
})
export class ProductConfigurationComponent {
  private route = inject(ActivatedRoute);
  id?: string;

  heroTitle: String = '(nouveau produit)';
  isGeneralInfoOpen: boolean = false;

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id') ?? undefined;

    if (this.id) {
      // UPDATE
      this.heroTitle = '(id n° ' + this.id + ')';
    } else {
      // CREATE
    }
  }
}
