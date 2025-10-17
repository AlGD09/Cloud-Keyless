import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.scss'],
})
export class TimeRangeComponent {
  @Input() start?: Date | null;
  @Input() end?: Date | null;
}
