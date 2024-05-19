import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'deskly-create-location-form',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInput, MatLabel, MatButton, ReactiveFormsModule],
  templateUrl: './create-location-form.component.html',
  styleUrl: './create-location-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLocationFormComponent {
  readonly submit = output<object>();

  readonly formGroup = this.formBuilder.group({
    name: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    street: this.formBuilder.control('', [Validators.required]),
    streetNumber: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(1)]),
    flatNumber: this.formBuilder.control<number | null>(null, [Validators.min(1)]),
    city: this.formBuilder.control('', [Validators.required]),
    zipCode: this.formBuilder.control('', [Validators.required])
  });

  constructor(private readonly formBuilder: FormBuilder) {
  }


  createLocation() {
    this.submit.emit(this.formGroup.value);
  }
}
