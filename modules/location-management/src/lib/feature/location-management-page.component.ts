import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLocationModalComponent } from '../ui/create-location-modal.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { LocationFacade } from '../domain/+state/location-facade';
import { LocationsTableComponent } from '../ui/locations-table.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'deskly-location-management-page',
  standalone: true,
  imports: [
    CommonModule,
    CreateLocationModalComponent,
    MatFabButton,
    MatIcon,
    MatTooltip,
    LocationsTableComponent,
    MatProgressSpinner
  ],
  templateUrl: './location-management-page.component.html',
  styleUrl: './location-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationManagementPageComponent implements OnInit {
  readonly previews = this.locationFacade.previews;
  readonly isLoading = this.locationFacade.isLoadingLocations;

  constructor(private readonly locationFacade: LocationFacade) {}

  ngOnInit(): void {
    this.locationFacade.fetchLocations();
  }

  openCreateLocationDialog() {
    this.locationFacade.startAddingLocation();
  }
}
