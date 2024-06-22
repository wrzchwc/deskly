import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Resource, ResourceKey, MetadataKey } from '../domain/resources.model';

@Component({
  selector: 'deskly-resources-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './resources-table.component.html',
  styleUrl: './resources-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesTableComponent {
  readonly dataSource = input<Resource[]>([]);
  readonly metadataColumns = input<MetadataKey[]>([]);

  readonly columns: ResourceKey[] = ['id', 'name', 'description', 'quantity'];

  readonly displayedColumns = computed(() => [
    ...this.columns,
    ...this.metadataColumns()
  ]);
}
