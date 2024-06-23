import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade } from '../domain/auth-facade';

@Component({
  selector: 'deskly-sign-in-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent {
  readonly formValues = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email
    ]),
    password: this.formBuilder.nonNullable.control('', [Validators.required])
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authFacade: AuthFacade
  ) {}

  signIn() {
    const { controls } = this.formValues;
    this.authFacade.signIn(controls['email'].value, controls['password'].value);
  }
}
