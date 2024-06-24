import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { BookingFacade } from '../domain/booking-facade';

@Component({
  selector: 'deskly-booking-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingPageComponent {
  constructor(private readonly bookingFacade: BookingFacade) {}

  bookResource() {
    this.bookingFacade.bookResource();
  }
}
