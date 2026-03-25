import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechnologyModel } from '../../models/technologyModel';

@Component({
  selector: 'app-project-small-card',
  imports: [RouterLink],
  templateUrl: './project-small-card.html',
  styleUrl: './project-small-card.css',
})
export class ProjectSmallCard {
  
  @Input()
  photoCover:string = "";
  @Input()
  cardTitle:string = "";
  @Input()
  tecnologies:TechnologyModel[] = [];
  @Input()
  isAdmin: boolean = true; 
  @Input()
  projectId: number = 0;
  @Input()
  routeDetails:string = "";
  @Input()
  routeEdit:string = "";



  @Output() 
  delete = new EventEmitter<number>();
  @Output() 
  edit = new EventEmitter<number>();
  
  constructor() {    

  }
  
  onDelete() {
    this.delete.emit(this.projectId);
  }

}
