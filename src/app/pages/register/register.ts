import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
 
function passwordStrengthValidator(control: FormControl) :ValidationErrors | null { //for password rules
  const value = control.value || '';
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumeric = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  return hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar ? null : { passwordStrength: true };
}

function passwordMatchValidator(control: AbstractControl) :ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
  } else {
    confirmPassword.setErrors(null);
  }

  return null;
}




@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm! : FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  showPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(\+20|0)?1[0125][0-9]{8}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), passwordStrengthValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: passwordMatchValidator }
    );
  }

  isInvalid(field:string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(field:string): string {
    const control = this.registerForm.get(field);
    if(!control?.errors) return '';

    const errors = control.errors;
    if(errors['required']) return `${this.fieldLabel(field)} is required.`;
    if(errors['minlength']) return `${this.fieldLabel(field)} must be at least ${errors['minlength'].requiredLength} characters.`;
    if(errors['email']) return `Please enter a valid email address.`;
    if(errors['pattern']) return `Enter a valid Egyptian phone number (e.g. 01012345678).`;
    if(errors['passwordStrength']) return `Password must contain uppercase, lowercase, number, and special character.`;
    if (errors['passwordMismatch']) {
    return 'Passwords do not match.';
}

    return 'Invalid field.';
  }

  private fieldLabel(field: string): string {
    const labels: Record<string, string> = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      password: 'Password',
      confirmPassword: 'Confirm password'
    };

    return labels[field] || field;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
 
    this.isLoading      = true;
    this.successMessage = '';
    this.errorMessage   = '';
 
    const { firstName, lastName, email, phone, password } = this.registerForm.value;
 
    setTimeout(() => {
      const users  = JSON.parse(localStorage.getItem('users') ?? '[]'); //chech user from local
      const exists = users.some((u: { email: string }) =>
        u.email.toLowerCase() === email.toLowerCase()
      );
 
      if (exists) {
        this.isLoading    = false;
        this.errorMessage = 'An account with this email already exists.';
        this.cdr.detectChanges();   
        return;
      }
 
      users.push({ firstName, lastName, email, phone, password });
      localStorage.setItem('users', JSON.stringify(users)); //users in local storage
 
      this.isLoading      = false;
      this.successMessage = 'Account created successfully! Redirecting...';
      this.cdr.detectChanges();     
 
      setTimeout(() => this.router.navigate(['/login']), 2500);
    }, 800);
  }
}
