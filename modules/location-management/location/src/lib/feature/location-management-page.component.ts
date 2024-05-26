import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLocationModalComponent } from '../ui/create-location-modal.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { LocationFacade } from '../domain/location-facade';
import { LocationsTableComponent } from '../ui/locations-table.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DeleteLocationModalData } from '../ui/delete-location-modal.component';
import { ResourcesFacade } from '@deskly/location-management/resources';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LocationFacade, ResourcesFacade]
})
export class LocationManagementPageComponent implements OnInit {
  readonly previews = this.locationFacade.previews;
  readonly isLoading = this.locationFacade.isLoadingLocations;

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

  openAddResourcesModal() {
    this.resourcesFacade.startAddingResources();
  }
}
