import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [Validators.required]),
  });

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.isLoading = false;

            console.log(res);

            this.successMsg = res.message;
            this.errorMsg = '';

            localStorage.setItem('token', res.data.token);
          } else {
            this.loginForm.markAllAsTouched();
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.successMsg = '';
          this.isLoading = false;
        },
        complete: () => {
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
      });
    }
  }
}
