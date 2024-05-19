import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CreateLocationFormComponent } from '../ui/create-location-form.component';
import { LocationService } from '../domain/location.service';
import { CreateLocationRequest } from '../domain/location.model';

@Component({
  selector: 'deskly-location-management-page',
  standalone: true,
  imports: [CommonModule, MatTabGroup, MatTab, CreateLocationFormComponent],
  templateUrl: './location-management-page.component.html',
  styleUrl: './location-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LocationService]
})
export class LocationManagementPageComponent {
  constructor(private readonly locationService: LocationService) {}

  createLocation(request: CreateLocationRequest): void {
    this.locationService.createLocation(request).subscribe(() => {
      console.log();
    });
  }
}
