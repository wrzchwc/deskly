import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'deskly-booking-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingPageComponent {}
