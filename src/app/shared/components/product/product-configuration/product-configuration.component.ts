import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-configuration',
  imports: [ReactiveFormsModule],
  templateUrl: './product-configuration.component.html',
  styleUrl: './product-configuration.component.css',
})
export class ProductConfigurationComponent {
  private route = inject(ActivatedRoute);
  id?: string;

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id') ?? undefined;

    if (this.id) {
      // UPDATE
    } else {
      // CREATE
    }
  }
}
