
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    const valid = /^[0-9]{10}$/.test(control.value);
    return valid ? null : { phoneNumber: true };
  }

  static matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    return password === confirmPassword ? null : { matchPassword: true };
  }
}

