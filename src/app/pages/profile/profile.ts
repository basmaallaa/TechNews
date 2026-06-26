import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: any = null;
  profileImage: string = '';

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private getImageKey(): string {
    return `profileImage_${this.user?.email}`;
  }
  loadUserProfile(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    const img = localStorage.getItem(this.getImageKey());
    this.profileImage = img || '';
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.profileImage = reader.result as string;
      localStorage.setItem(this.getImageKey(), this.profileImage);
    };

    reader.readAsDataURL(file);
  }
}
