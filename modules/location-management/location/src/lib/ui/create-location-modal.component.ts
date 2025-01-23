import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpeningHoursInputComponent } from './opening-hours-input.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateLocationConfig } from '../domain/location.model';
import { CreateLocationRequest } from '../domain/create-location';

@Component({
  selector: 'deskly-create-location-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    OpeningHoursInputComponent,
    MatDialogModule
  ],
  templateUrl: './create-location-modal.component.html',
  styleUrl: './create-location-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLocationModalComponent {
  readonly formSubmitted = output<CreateLocationConfig>();

  readonly formGroup = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', [Validators.required]),
    street: this.formBuilder.nonNullable.control('', [Validators.required]),
    city: this.formBuilder.nonNullable.control('', [Validators.required]),
    buildingName: this.formBuilder.nonNullable.control<string>('', [
      Validators.required
    ]),
    flatNumber: this.formBuilder.nonNullable.control<string>(''),
    postalCode: this.formBuilder.nonNullable.control('', [Validators.required]),
    email: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: this.formBuilder.nonNullable.control('', [Validators.required])
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly matDialogRef: MatDialogRef<
      CreateLocationModalComponent,
      CreateLocationRequest
    >
  ) {}

  createLocation(): void {
    this.matDialogRef.close(this.formGroup.value as CreateLocationRequest);
  }
}
