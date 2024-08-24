import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-gray-200 h-2 rounded-full">
      <div class="bg-blue-500 h-2 rounded-full" [style]="style"></div>
    </div>
  `,
})
export class ProgressBarComponent {
  progress = input(0);

  style = '';

  constructor() {
    effect(() => {
      this.style = `width: ${this.progress()}%`;
    });
  }
}
