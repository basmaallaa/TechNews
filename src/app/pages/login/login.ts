import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  //for localStorage
  private readonly USERS_KEY = 'users';
  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';
  private readonly CURRENT_USER_KEY = 'currentUser';

  
  constructor( private router: Router) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormBuilder().control('', [Validators.required, Validators.email]),
      password: new FormBuilder().control('', [Validators.required, Validators.minLength(8)]),
      rememberMe: new FormBuilder().control(false)
    });
  }

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control || !control.errors) return '';

    const errors = control.errors;
    if (errors['required']) {
      return `${this.fieldLabel(field)} is required.`;}  
    if (errors['email']) return `Please enter a valid email address.`;
    if (errors['minlength']) return `${this.fieldLabel(field)} must be at least ${errors['minlength'].requiredLength} characters long.`;
    return '';
  }

  fieldLabel(field: string): string {
    switch (field) {
      case 'email': return 'Email';
      case 'password': return 'Password';
      default: return field;
    }
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  private saveLogin (user : any): void {
    localStorage.setItem(this.IS_LOGGED_IN_KEY, 'true'); //isLoggedIn in local storage == true

    const currentUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber : user.phone
    };
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser)); //current in local storage
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const {email, password, rememberMe} = this.loginForm.value;

    setTimeout(() => {
      const users = this.getUsers();
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )
      this.isLoading = false;
      if (user) {
        this.saveLogin(user);
        window.dispatchEvent(new Event('storage'));
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid email or password.';
        setTimeout(() => this.router.navigate(['/not-found']), 2000);
      }
    }, 1000); 
  }

}
 
