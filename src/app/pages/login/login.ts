import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MessageModal } from '../../components/message-modal/message-modal';
import { viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [MessageModal, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  user:string = "";
  password:string = "";

  //Rotas, não usar no construtor. Evita erros
  private router = inject(Router);

  //Modal para exibir mensagens na tela
  modal = viewChild<MessageModal>('modal');

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {

  }

  goHome() {  
    this.router.navigate(['/']); 
  }

  mostrarModal(title:string, message:string, button:string) { 
    const modalInstance = this.modal();   
    modalInstance!.showModal(title, message, button);     
  }

  mostrarModalComComando(title:string, message:string, button:string, command:string) { 
    const modalInstance = this.modal();   
    modalInstance!.showModalWithCommand(title, message, button, command);     
  }

  login() {

    const loginData = { username: this.user, password: this.password};

    this.authService.postLogin(loginData).subscribe({
        next: (res: any) => {
          
          this.mostrarModalComComando('Sucesso', 'Login efetuado com sucesso', 'Ok', '/');
          
          localStorage.setItem('auth_token', res.token);

          this.authService.loginAdmin();
          this.cdr.markForCheck();       
             
        },
        error: (err) => {
          this.mostrarModal('Erro', 'Usuário e senha inválidos', 'Ok');          
          this.cdr.markForCheck();       
          console.log(err);
        }
    });

    
  }

  


}

  
/* Para usar:
import { AuthService } from '../../services/authService';

constructor(public authService: AuthService) {}

@if (authService.isAdmin()) {
  <button class="details_btn">Editar</button>
  <button class="details_btn">Deletar</button>
}


também pode ser salvo no localstorage:
loginAdmin() {
  localStorage.setItem('isAdmin', 'true');
  this.isAdmin.set(true);
}

vou ter que fazer no home? app?
No start da aplicação:
constructor() {
  const saved = localStorage.getItem('isAdmin');
  this.isAdmin.set(saved === 'true');
}


*/
