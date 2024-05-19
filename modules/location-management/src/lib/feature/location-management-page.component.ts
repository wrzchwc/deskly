import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CreateLocationFormComponent } from '../ui/create-location-form.component';

@Component({
  selector: 'deskly-location-management-page',
  standalone: true,
  imports: [CommonModule, MatTabGroup, MatTab, CreateLocationFormComponent],
  templateUrl: './location-management-page.component.html',
  styleUrl: './location-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationManagementPageComponent {
  createLocation($event: object): void {
    console.log($event);
  }
}
