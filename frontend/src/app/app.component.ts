import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { HttpClient } from '@angular/common/http';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { RegisterPageComponent } from "./components/register-page/register-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, AboutPageComponent, RouterModule, RouterLink, RouterLinkActive, RegisterPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
