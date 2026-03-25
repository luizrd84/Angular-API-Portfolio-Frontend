import { Component } from '@angular/core';
import { ProjectSmallCard } from '../project-small-card/project-small-card';
import { ProjectService } from '../../services/projectService';
import { TechnologyModel } from '../../models/technologyModel';
import { url } from 'inspector';
import { ImageModel } from '../../models/imageModel';
import { forkJoin } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ProjectModel } from '../../models/projectModel';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/authService';
import { inject } from '@angular/core';
import { MessageModal } from '../../components/message-modal/message-modal';
import { viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.config';

@Component({
  selector: 'app-view-all-projects',
  imports: [ProjectSmallCard, RouterLink, MessageModal],
  templateUrl: './view-all-projects.html',
  styleUrl: './view-all-projects.css',
})
export class ViewAllProjects {

  cardProjects: {id: number; title: string; image: string; technologies: TechnologyModel[] }[] = [];

  cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  projectService = inject(ProjectService)
  http = inject(HttpClient);

  tokenIsValid : boolean = false;

  //Modal para exibir mensagens na tela
  modal = viewChild<MessageModal>('modal');

  backendOnline:boolean = false;
  loadingBackend:boolean = true; //true é o padrão
  isAlive:boolean = true;

  constructor() {  }

  async ngOnInit() {
    this.tokenIsValid = !this.authService.isTokenExpired();

    this.checkBackend();
        
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  checkBackend() {
    this.http.get(`${API_URL}/`, { responseType: 'text' })
      .subscribe({
        next: () => {
          console.log("Backend online");

          this.backendOnline = true;
          this.loadingBackend = false;

          //Transferi do ngOnInit para esse método.
          this.loadData();
        },
        error: (err) => {          
          if (!this.backendOnline && this.isAlive) {
            setTimeout(() => this.checkBackend(), 3000);
          }
        }
      });
  }

  deleteProject(id: number) {    
    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.mostrarModal('Sucesso', `Projeto deletado com sucesso`, 'Ok');
        this.loadData();
        this.cdr.markForCheck();  
        
      },
      error: (err) => {
        this.mostrarModal('Erro', `Erro ao deletar o projeto`, 'Ok');
        this.cdr.markForCheck();  
      }
    });     
  }


  mostrarModal(title:string, message:string, button:string) { 
    const modalInstance = this.modal();   
    modalInstance!.showModal(title, message, button);     
  }

  loadData() {
    forkJoin({
      images: this.projectService.getAllImages(),
      projects: this.projectService.getTechnologiesOfAllProjects()    
    }).subscribe(({ images, projects }) => {

      const imagesByProject = new Map<number, ImageModel[]>();

      images.forEach(img => {
        if (!imagesByProject.has(img.projectId)) {
          imagesByProject.set(img.projectId, []);
        }

        imagesByProject.get(img.projectId)!.push(img);
      });

      this.cardProjects = projects.map(project => {

        const projectImages = imagesByProject.get(project.id);       

        const projectImage1 =  projectImages?.find(img => img.order === 1)?.imageUrl ||
          projectImages?.[0]?.imageUrl ||  "";

        return {
          id: project.id,
          title: project.title,
          image: projectImage1,
          technologies: project.technologies ?? [],
        };

      });

      this.cdr.markForCheck();    


    });
  }



  
}
