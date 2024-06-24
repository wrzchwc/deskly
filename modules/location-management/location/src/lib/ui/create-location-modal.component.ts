import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  OpeningHoursFormGroup,
  OpeningHoursInputComponent
} from './opening-hours-input.component';
import { WeekDay as WeekDayLabel } from '@deskly/shared/constants';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateLocationConfig } from '../domain/location.model';

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
    address: this.formBuilder.group({
      street: this.formBuilder.nonNullable.control('', [Validators.required]),
      city: this.formBuilder.nonNullable.control('', [Validators.required]),
      streetNumber: this.formBuilder.control<number | null>(null, [
        Validators.required,
        Validators.min(1)
      ]),
      flatNumber: this.formBuilder.control<number | null>(null, [
        Validators.min(1)
      ]),
      zipCode: this.formBuilder.nonNullable.control('', [Validators.required])
    }),
    hours: this.formBuilder.group({
      monday: this.formBuilder.group({
        start: this.formBuilder.nonNullable.control(''),
        finish: this.formBuilder.nonNullable.control('')
      }),
      tuesday: this.formBuilder.group({
        start: this.formBuilder.nonNullable.control(''),
        finish: this.formBuilder.nonNullable.control('')
      }),
      wednesday: this.formBuilder.group({
        start: this.formBuilder.nonNullable.control(''),
        finish: this.formBuilder.nonNullable.control('')
      }),
      thursday: this.formBuilder.group({
        start: this.formBuilder.nonNullable.control(''),
        finish: this.formBuilder.nonNullable.control('')
      }),
      friday: this.formBuilder.group({
        start: this.formBuilder.nonNullable.control(''),
        finish: this.formBuilder.nonNullable.control('')
      }),
      saturday: this.formBuilder.group({
        start: this.formBuilder.nonNullable.control(''),
        finish: this.formBuilder.nonNullable.control('')
      }),
      sunday: this.formBuilder.group({
        start: this.formBuilder.nonNullable.control(''),
        finish: this.formBuilder.nonNullable.control('')
      })
    })
  });

  readonly openingHoursFormGroups: OpeningHoursFormGroup[] = Object.values(
    this.formGroup.controls.hours.controls
  );

  readonly days: WeekDayLabel[] = Object.values(WeekDayLabel);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly matDialogRef: MatDialogRef<
      CreateLocationModalComponent,
      CreateLocationConfig
    >
  ) {}

  createLocation(): void {
    this.matDialogRef.close(this.formGroup.value as CreateLocationConfig);
  }
}
