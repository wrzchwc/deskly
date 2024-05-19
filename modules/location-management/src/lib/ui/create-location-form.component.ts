import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  OpeningHoursFormGroup,
  OpeningHoursInputComponent
} from './opening-hours-input.component';
import { WeekDay } from '@deskly/constants';
import { CreateLocationRequest } from '../domain/location.model';

@Component({
  selector: 'deskly-create-location-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    OpeningHoursInputComponent
  ],
  templateUrl: './create-location-form.component.html',
  styleUrl: './create-location-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLocationFormComponent {
  readonly submit = output<CreateLocationRequest>();

  readonly formGroup = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', [Validators.required]),
    address: this.formBuilder.group({
      street: this.formBuilder.nonNullable.control('', [Validators.required]),
      streetNumber: this.formBuilder.control<number | null>(null, [
        Validators.required,
        Validators.min(1)
      ]),
      flatNumber: this.formBuilder.control<number | null>(null, [
        Validators.min(1)
      ]),
      city: this.formBuilder.nonNullable.control('', [Validators.required]),
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

  readonly days: WeekDay[] = Object.values(WeekDay);

  constructor(private readonly formBuilder: FormBuilder) {}

  createLocation(): void {
    this.submit.emit(this.formGroup.value as CreateLocationRequest);
  }
}
