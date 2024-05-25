import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPreview } from '../domain/location.model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'deskly-locations-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltip,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatIcon,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatTable
  ],
  templateUrl: './locations-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsTableComponent {
  readonly previews = input<LocationPreview[]>([]);

  readonly displayedColumns = ['id', 'name', 'city', 'options'];
}
