import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLocationModalComponent } from '../ui/create-location-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationFacade } from './location-facade';
import { LocationsTableComponent } from '../ui/locations-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteLocationModalData } from '../ui/delete-location-modal.component';
import { ResourcesFacade } from '@deskly/location-management/resources';

@Component({
  selector: 'deskly-location-management-page',
  standalone: true,
  imports: [
    CommonModule,
    CreateLocationModalComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LocationsTableComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: '../feature/location-management-page.component.html',
  styleUrl: '../feature/location-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationManagementPageComponent implements OnInit {
  readonly previews = this.locationFacade.previews;
  readonly isLoading = this.locationFacade.isLoadingInProgress;

  constructor(
    private readonly locationFacade: LocationFacade,
    private readonly resourcesFacade: ResourcesFacade
  ) {}

  ngOnInit(): void {
    this.locationFacade.fetchLocations();
  }

  openCreateLocationDialog() {
    this.locationFacade.startAddingLocation();
  }

  openDeleteLocationModal(data: DeleteLocationModalData) {
    this.locationFacade.startDeletingLocation(data);
  }

  openAddResourcesModal(locationId: string) {
    this.resourcesFacade.startAddingResources(locationId);
  }
}
