import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  email: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log("user profile fetching");
  }
}
