import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { WeekDay } from '@deskly/constants';

export type OpeningHoursFormGroup = FormGroup<{
  readonly start: FormControl<string>;
  readonly finish: FormControl<string>;
}>;

@Component({
  selector: 'deskly-opening-hours-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './opening-hours-input.component.html',
  styleUrl: './opening-hours-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpeningHoursInputComponent {
  readonly formGroup = input<OpeningHoursFormGroup>(
    this.formBuilder.group({
      start: this.formBuilder.nonNullable.control(''),
      finish: this.formBuilder.nonNullable.control('')
    })
  );

  readonly day = input<WeekDay>(WeekDay.MONDAY);

  constructor(private readonly formBuilder: FormBuilder) {}
}
