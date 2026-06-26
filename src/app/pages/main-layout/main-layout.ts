import { Component } from '@angular/core';
import { Nav } from "../../Components/nav/nav";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../Components/footer/footer";

@Component({
  selector: 'app-main-layout',
  imports: [Nav, RouterOutlet, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
