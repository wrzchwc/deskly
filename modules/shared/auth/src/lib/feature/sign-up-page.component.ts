import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Authority } from '../domain/auth.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../domain/auth-facade';

@Component({
  selector: 'deskly-sign-up-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpPageComponent {
  readonly userTypes = Object.values(Authority);
  readonly formValues = this.formBuilder.nonNullable.group({
    email: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),
    name: this.formBuilder.nonNullable.control('', [Validators.required]),
    surname: this.formBuilder.nonNullable.control('', [Validators.required]),
    password: this.formBuilder.nonNullable.control('', [Validators.required]),
    userType: this.formBuilder.nonNullable.control(Authority.TENANT, [
      Validators.required
    ])
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade
  ) {}

  signUp() {
    this.authFacade.signUp(this.formValues.getRawValue());
  }
}
