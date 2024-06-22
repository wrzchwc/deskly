import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningHours } from '../domain/location.model';
import { WeekDay } from '@deskly/shared/constants';

@Component({
  selector: 'deskly-opening-hours-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opening-hours-preview.component.html',
  styleUrl: './opening-hours-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpeningHoursPreviewComponent {
  readonly day = input<WeekDay>(WeekDay.MONDAY);
  readonly openingHours = input<OpeningHours>({
    start: '00:00',
    finish: '23:59'
  });
}
