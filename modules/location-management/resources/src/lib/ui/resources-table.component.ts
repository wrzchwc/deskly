import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ResourceKey } from '../domain/resources.model';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { AttributeName, Resource } from '../domain/resource';

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
  readonly attributeColumns = input<AttributeName[]>([]);

  readonly removeResource = output<string>();

  readonly columns: ResourceKey[] = ['id', 'name', 'description', 'quantity'];

  readonly displayedColumns = computed(() => [
    ...this.columns,
    ...this.attributeColumns()
  ]);

  onRowContextMenuClick(resourceId: string) {
    this.selectedResourceId.set(resourceId);
  }

  onRemove() {
    this.removeResource.emit(this.selectedResourceId());
  }

  private readonly selectedResourceId = signal('');
}
