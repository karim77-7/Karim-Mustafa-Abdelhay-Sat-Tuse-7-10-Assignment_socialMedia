import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {

  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Password changed successfully'); 
            this.changePasswordForm.reset();
          }
        },
        error: (err) => {
          this.toastr.error(err.error.message); 
        },
      });
    }
  }
}