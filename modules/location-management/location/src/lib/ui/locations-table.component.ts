import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPreview } from '../domain/location.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteLocationModalData } from './delete-location-modal.component';

@Component({
  selector: 'deskly-locations-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './locations-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsTableComponent {
  readonly previews = input<LocationPreview[]>([]);

  readonly deleteStart = output<DeleteLocationModalData>();
  readonly addResources = output();

  readonly displayedColumns = ['id', 'name', 'city', 'options'];

  deleteLocation(id: string, name: string) {
    this.deleteStart.emit({ id, name });
  }

  onAddResources(): void {
    this.addResources.emit();
  }
}
