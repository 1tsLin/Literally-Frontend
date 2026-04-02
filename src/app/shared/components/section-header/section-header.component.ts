import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css',
})
export class SectionHeaderComponent {
  @Input() title!: String;
  @Input() isOpen: boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }
}
