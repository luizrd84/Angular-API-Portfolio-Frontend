import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-modal',
  imports: [CommonModule],
  templateUrl: './message-modal.html',
  styleUrl: './message-modal.css',
})
export class MessageModal {

  private router = inject(Router);

  isVisible:boolean = false;
  title:string = '';
  message:string = '';
  buttonText:string = 'Ok';

  comando:string = "";

  // Método para abrir o modal
  showModalWithCommand(title: string, message: string, buttonText: string = 'Ok', comando: string) {
    this.title = title;
    this.message = message;
    this.buttonText = buttonText;
    this.isVisible = true;

    if(comando) {
      this.comando = comando;
    }
  }

  showModal(title: string, message: string, buttonText: string = 'Ok') {
    this.title = title;
    this.message = message;
    this.buttonText = buttonText;
    this.isVisible = true;   
  }

  // Fecha o modal
  closeModal() {
    this.isVisible = false;


    if(this.comando) {
      this.router.navigate([this.comando]); 
    }
    this.comando = "";
  }
}
