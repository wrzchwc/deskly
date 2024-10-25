import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationFacade } from '../domain/location-facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { OpeningHoursPreviewComponent } from '../ui/opening-hours-preview.component';
import { WeekDay } from '@deskly/shared/constants';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  ResourcesFacade,
  ResourcesPreviewComponent
} from '@deskly/location-management/resources';
import { WorkDay } from '@deskly/shared/location';

interface OpeningHoursData {
  readonly day: WeekDay;
  readonly hours: WorkDay | undefined;
}

@Component({
  selector: 'deskly-location-information-page',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    OpeningHoursPreviewComponent,
    MatMenuModule,
    MatButtonModule,
    ResourcesPreviewComponent
  ],
  templateUrl: './location-information-page.component.html',
  styleUrl: './location-information-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationInformationPageComponent implements OnInit {
  private readonly locationFacade = inject(LocationFacade);
  private readonly resourcesFacade = inject(ResourcesFacade);

  readonly locationId = input('');

  readonly location = this.locationFacade.currentLocation;
  readonly isLoading = this.locationFacade.isLoadingInProgress;
  readonly address = computed(() => this.location()?.address);
  readonly openingHoursData = computed<OpeningHoursData[]>(() => {
    const location = this.location();
    if (!location) {
      return [];
    }
    return Object.values(WeekDay).map((day) => ({
      day,
      hours: location.openingHours.week[day].at(0)
    }));
  });
  readonly hotDesks = this.locationFacade.currentLocationHotDesks;
  readonly conferenceRooms = this.locationFacade.currentLocationConferenceRooms;
  readonly audioVideoDevices =
    this.locationFacade.currentLocationAudioVideoDevices;
  readonly privateDesks = this.locationFacade.currentLocationPrivateDesks;
  readonly privateRooms = this.locationFacade.currentLocationPrivateRooms;

  ngOnInit(): void {
    this.locationFacade.fetchLocation(this.locationId());
  }

  fetchResources() {
    this.resourcesFacade.fetchResources(this.locationId());
  }

  addResource() {
    this.resourcesFacade.startAddingResources(this.locationId());
  }

  removeLocation() {
    this.locationFacade.startDeletingLocation({
      id: this.locationId(),
      name: this.location()?.name.name || ''
    });
  }

  removeResource(resourceId: string) {
    this.resourcesFacade.removeResource(resourceId, this.locationId());
  }
}
