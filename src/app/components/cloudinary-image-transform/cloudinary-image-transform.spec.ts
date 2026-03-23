import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudinaryImageTransform } from './cloudinary-image-transform';

describe('CloudinaryImageTransform', () => {
  let component: CloudinaryImageTransform;
  let fixture: ComponentFixture<CloudinaryImageTransform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudinaryImageTransform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudinaryImageTransform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
