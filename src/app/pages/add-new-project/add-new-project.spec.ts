import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProject } from './add-new-project';

describe('AddNewProject', () => {
  let component: AddNewProject;
  let fixture: ComponentFixture<AddNewProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
