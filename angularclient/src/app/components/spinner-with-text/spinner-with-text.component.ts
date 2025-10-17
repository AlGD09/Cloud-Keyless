import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-spinner-with-text',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner-with-text.component.html',
  styleUrls: ['./spinner-with-text.component.scss'],
})
export class SpinnerWithTextComponent {
  @Input() state: 'off' | 'on' | 'charging' = 'off';

  get isIndeterminate(): boolean {
    return this.state === 'charging';
  }

  get text(): string {
    switch (this.state) {
      case 'off': return $localize`Chargepoint is waiting`;
      case 'on': return $localize`Ready!`;
      case 'charging': return $localize`Charging!`;
    }
  }

  get additionalClass(): string {
    return {
      off: 'grey-spinner',
      on: 'pulsating-spinner',
      charging: 'blue-spinner'
    }[this.state];
  }
}
