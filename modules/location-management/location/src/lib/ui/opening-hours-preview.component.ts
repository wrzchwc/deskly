import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekDay } from '@deskly/shared/constants';
import { WorkDay } from '@deskly/shared/location';

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
  readonly openingHours = input<WorkDay | undefined>({
    from: '00:00',
    to: '23:59'
  });

  readonly from = computed(() => this.openingHours()?.from || '00:00');
  readonly to = computed(() => this.openingHours()?.to || '23:59');
}
