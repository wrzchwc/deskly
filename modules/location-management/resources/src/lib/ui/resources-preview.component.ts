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
import { MatTableModule } from '@angular/material/table';
import { ResourcesTableComponent } from './resources-table.component';
import { AttributeName, Resource } from '../domain/resource';

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
  readonly desks = input<Resource[]>([]);
  readonly conferenceRooms = input<Resource[]>([]);
  readonly audioVideoDevices = input<Resource[]>([]);
  readonly privateRooms = input<Resource[]>([]);

  readonly openPreview = output<void>();
  readonly removeResource = output<string>();

  readonly desksMetadata: AttributeName[] = [
    'producer',
    'serial number',
    'width',
    'depth'
  ];
  readonly roomsMetadata: AttributeName[] = [];
  readonly audioVideoDevicesMetadata: AttributeName[] = [
    'producer',
    'serial number'
  ];

  onOpen() {
    this.panelOpenState.set(true);
    this.openPreview.emit();
  }

  onClose() {
    this.panelOpenState.set(false);
  }

  onRemoveResource(resourceId: string) {
    this.removeResource.emit(resourceId);
  }

  private readonly panelOpenState = signal(false);
}
