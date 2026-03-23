import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ViewAllProjects } from "../../components/view-all-projects/view-all-projects";
// import { MessageModal } from '../../components/message-modal/message-modal';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ViewAllProjects],//, MessageModal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  


}
