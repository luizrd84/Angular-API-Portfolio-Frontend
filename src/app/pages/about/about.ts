import { Component } from '@angular/core';
import { CloudinaryImageTransform } from '../../components/cloudinary-image-transform/cloudinary-image-transform';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about',
  imports: [CloudinaryImageTransform],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  
  private router = inject(Router);

  goHome() {  
    this.router.navigate(['/']);
  }
}
