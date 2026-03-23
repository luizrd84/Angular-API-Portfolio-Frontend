import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cloud-image-transform',
  imports: [],
  templateUrl: './cloudinary-image-transform.html',
  styleUrl: './cloudinary-image-transform.css',
})
export class CloudinaryImageTransform {
  @Input() src!: string;       // URL da Cloudinary
  @Input() alt: string = '';   // texto alternativo
  @Input() width: number = 300;  // largura desejada
  @Input() height: number = 200; // altura desejada

  loaded = false; // controla quando a imagem terminou de carregar
}
