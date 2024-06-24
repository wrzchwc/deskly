import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsStore } from '../domain/locations.store';

@Component({
  selector: 'deskly-booking-resource-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-resource-modal.component.html',
  styleUrl: './booking-resource-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LocationsStore]
})
export class BookingResourceModalComponent {
  private readonly locationsStore = inject(LocationsStore);

  readonly locations = this.locationsStore.locations;
  readonly isLoadingLocations = this.locationsStore.isLoading;
}
