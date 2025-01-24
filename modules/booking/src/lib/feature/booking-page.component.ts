import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'deskly-booking-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule, NgOptimizedImage],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingPageComponent {}
