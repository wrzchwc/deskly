import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

export interface DeleteLocationModalData {
  readonly id: string;
  readonly name: string;
}

@Component({
  selector: 'deskly-delete-location-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
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
