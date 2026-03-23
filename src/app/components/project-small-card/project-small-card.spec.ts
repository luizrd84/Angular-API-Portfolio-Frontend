import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSmallCard } from './project-small-card';

describe('ProjectSmallCard', () => {
  let component: ProjectSmallCard;
  let fixture: ComponentFixture<ProjectSmallCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSmallCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSmallCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
