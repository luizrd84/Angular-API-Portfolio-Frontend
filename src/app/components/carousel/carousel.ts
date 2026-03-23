import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ImageModel } from '../../models/imageModel';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  height = 600;
  loaded = false;

  currentIndex = 0;

  @Input() 
  imagesList: ImageModel[] = [];

  urlNoImage:string = "assets/SemImagem.png";

  next() {
    if (this.imagesList.length <= 1) return;

    this.loaded = false;
    this.currentIndex = (this.currentIndex + 1) % this.imagesList.length;
  }

  prev() {
    if (this.imagesList.length <= 1) return;

    this.loaded = false;
    this.currentIndex =
      (this.currentIndex - 1 + this.imagesList.length) % this.imagesList.length;
  }

  onLoad() {
    this.loaded = true;
  }

}
