import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CreateLocationModalComponent } from '../ui/create-location-modal.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { startAddingLocation } from '../domain/location.actions';

@Component({
  selector: 'deskly-location-management-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTabGroup,
    MatTab,
    CreateLocationModalComponent,
    MatFabButton,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './location-management-page.component.html',
  styleUrl: './location-management-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationManagementPageComponent {
  constructor(private readonly store: Store) {}

  openCreateLocationDialog() {
    this.store.dispatch(startAddingLocation());
  }
}
