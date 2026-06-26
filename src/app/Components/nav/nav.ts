import { Component , OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common";
import {Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  navHome = 'Home';
  navAbout = 'About';
  navAllPosts = 'All Posts';
  navProfile = 'Profile';

  searchPlaceholder = 'Search articles...';
  isLoggedIn = false;
  user : any = null;

  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.checkAuth();
    this.loadUser();
    window.addEventListener('storage', this.syncAuth);

    document.addEventListener('click', (event: any) => {
    if (!event.target.closest('nav')) {
      this.menuOpen = false;
    }
  });
  }

  checkAuth(): void {
    this.isLoggedIn = localStorage.getItem(this.IS_LOGGED_IN_KEY) === 'true';
  }

  syncAuth = (): void => {
    this.checkAuth();
    this.loadUser();
  };

  loadUser() : void {
    const data = localStorage.getItem('currentUser');
    this.user = data ? JSON.parse(data) : null;
  }

  logout(): void {
    localStorage.removeItem(this.IS_LOGGED_IN_KEY);
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  menuOpen = false;

toggleMenu(): void {
  this.menuOpen = !this.menuOpen;
}

closeMenu(): void {
  this.menuOpen = false;
}
}
