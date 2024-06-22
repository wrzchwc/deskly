import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input, output, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Resource, ResourceKey, MetadataKey } from '../domain/resources.model';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'deskly-resources-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, CdkMenuModule, MatMenuModule],
  templateUrl: './resources-table.component.html',
  styleUrl: './resources-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesTableComponent {
  readonly dataSource = input<Resource[]>([]);
  readonly metadataColumns = input<MetadataKey[]>([]);

  readonly removeResource = output<string>();

  readonly columns: ResourceKey[] = ['id', 'name', 'description', 'quantity'];

  readonly displayedColumns = computed(() => [
    ...this.columns,
    ...this.metadataColumns()
  ]);

  onRowContextMenuClick(resourceId: string) {
    this.selectedResourceId.set(resourceId);
  }

  onRemove() {
    this.removeResource.emit(this.selectedResourceId());
  }

  private readonly selectedResourceId = signal('');
}
