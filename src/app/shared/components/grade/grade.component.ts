import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-grade',
  imports: [],
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.css',
})
export class GradeComponent implements OnChanges {
  @Input() grade: number = 0;
  @Input() totalReviews: number = 0;

  starContent: string[] = ['empty', 'empty', 'empty', 'empty', 'empty'];

  ngOnChanges(): void {
    for (let i = 0; i < 5; i++) {
      if (this.grade >= 1) {
        this.starContent[i] = 'filled';
      } else if (this.grade > 0 && this.grade < 1) {
        this.starContent[i] = 'half';
      }
      this.grade--;
    }
  }
}
