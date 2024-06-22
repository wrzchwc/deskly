import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { Resource, MetadataKey } from '../domain/resources.model';
import { MatTableModule } from '@angular/material/table';
import { ResourcesTableComponent } from './resources-table.component';

@Component({
  selector: 'deskly-resources-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatAccordion,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    ResourcesTableComponent
  ],
  templateUrl: './resources-preview.component.html',
  styleUrl: './resources-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesPreviewComponent {
  readonly hotDesks = input<Resource[]>([]);
  readonly conferenceRooms = input<Resource[]>([]);
  readonly audioVideoDevices = input<Resource[]>([]);
  readonly privateDesks = input<Resource[]>([]);
  readonly privateRooms = input<Resource[]>([]);

  readonly openPreview = output();

  readonly desksMetadata: MetadataKey[] = ['manufacturer', 'model'];
  readonly roomsMetadata: MetadataKey[] = ['capacity'];
  readonly audioVideoDevicesMetadata: MetadataKey[] = [
    'manufacturer',
    'model',
    'serialNumber'
  ];

  onOpen() {
    this.panelOpenState.set(true);
    this.openPreview.emit();
  }

  onClose() {
    this.panelOpenState.set(false);
  }

  private readonly panelOpenState = signal(false);
}
