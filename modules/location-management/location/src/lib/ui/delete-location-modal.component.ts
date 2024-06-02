import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DeleteLocationModalData {
  readonly id: string;
  readonly name: string;
}

@Component({
  selector: 'deskly-delete-location-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-location-modal.component.html',
  styleUrl: './delete-location-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteLocationModalComponent {
  constructor(
    private readonly matDialogRef: MatDialogRef<
      DeleteLocationModalComponent,
      string
    >,
    @Inject(MAT_DIALOG_DATA) private readonly modalData: DeleteLocationModalData
  ) {}

  get name() {
    return this.modalData.name;
  }

  deleteLocation() {
    this.matDialogRef.close(this.modalData.id);
  }
}
