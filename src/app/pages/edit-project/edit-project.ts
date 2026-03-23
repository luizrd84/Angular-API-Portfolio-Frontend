import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TechnologyModel } from '../../models/technologyModel';
import { ProjectService } from '../../services/projectService';
import { CreateProjectDTO } from '../../models/createProjectDTO';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { inject } from '@angular/core';
import { MessageModal } from '../../components/message-modal/message-modal';
import { viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';


interface ImageItem {
  file?: File;
  imageUrl?: string;
  alt: string;
  cloudinaryId?: string;
  description: string;  
  isPrimary: boolean;
}

interface TechnologyItem {
  id?: number;
  name: string;
  logo: string;
  selected?: boolean; // para as já existentes
}

@Component({
  selector: 'app-edit-project',
  imports: [FormsModule, MessageModal],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.css',
})
export class EditProject {

  private router = inject(Router);  
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private projectService = inject(ProjectService);
  private cdr = inject(ChangeDetectorRef);

  //Imagens exibidas na tela
  imageItems: ImageItem[] = [];
  
  //já vindas do banco - NgModel
  existingTechnologies: TechnologyItem[] = []; //indices??? vou precisar?
  
  //novas que o usuário vai adicionar - NgModel
  newTechnologies: TechnologyItem[] = [];
  
  //Lista com dados recebidos do backend - lista bruta, não utilizada na tela.
  technologies: TechnologyModel[] = []; 

  //Preparando os dados para ser enviado
  project: CreateProjectDTO = {    
    title: '',
    description: '',
    createdAt: new Date(),
    technologies: [],
    images: []
  };
  createdAt:string = "";

  projectId: number | null = null;

  //Modal para exibir mensagens na tela
  modal = viewChild<MessageModal>('modal');

  constructor() {  }  
  
  ngOnInit() {

    this.carregarTecnologias();

    //Pegar o path param = id do projeto
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) {
        console.error("ID não informado na rota");
        return;
      }
      this.projectId = Number(idParam);

      //Carregar dados do projeto
      this.loadProjectData(this.projectId);
    });

      
  }

  loadProjectData(projectId: number) {    

    forkJoin({
        images: this.projectService.getImagesByProjectId(projectId),
        project: this.projectService.getProjectById(projectId),
        technologies: this.projectService.getTecnologiesByProjectId(projectId)
    }).subscribe({
      next: ({ images, project, technologies }) => {

        this.project.images = images;        
        this.project.title = project.title;
        this.project.description = project.description;       
        
        this.createdAt = this.formatDateToMonthInput(project.createdAt);
        this.project.githubUrl = project.githubUrl;
        this.project.demoUrl = project.demoUrl;

        this.existingTechnologies.forEach((tech) => {
          if(technologies) {
            for(let i = 0; i< technologies.length; i++) {
              if(tech.id === technologies[i].id) {
                tech.selected = true;                
              }
            }
          }
        });

                      
        images.forEach((image) => {
          let primary;
          if(image.order === 1) 
            primary = true;
          else
            primary = false;          

          this.imageItems.push({
            imageUrl: image.imageUrl,
            alt: image.alt,
            cloudinaryId: image.cloudinaryId,
            description: image.description,
            isPrimary: primary
          });
        });

        this.cdr.detectChanges();         
      },
      error: (err) => {
        console.error("Erro ao carregar dados do projeto", err);
      }
    });

  }

  formatDateToMonthInput(date: string | Date): string {
    if (typeof date === 'string') {
      return date.slice(0, 7);
    }
    return date.toISOString().slice(0, 7);
  }


  mostrarModal(title:string, message:string, button:string) { 
    const modalInstance = this.modal();   
    modalInstance!.showModal(title, message, button);     
  }

  mostrarModalComComando(title:string, message:string, button:string, command:string) { 
    const modalInstance = this.modal();   
    modalInstance!.showModalWithCommand(title, message, button, command);     
  }

  carregarTecnologias() {
    this.projectService.getAllTechnologies().subscribe({
      next: (res) => {
        
        this.existingTechnologies = res.map((tech: any) => ({
          id: tech.id,
          name: tech.name,
          logo: tech.url,
          selected: false
        }));
        
        // Força a detecção se o componente for OnPush ou estiver fora da zona
        this.cdr.markForCheck(); 
      },
      error: err => console.error("ERRO API", err)
    });
  }
    
  addNewItemImage() {
    this.imageItems.push({
      imageUrl: '',
      alt: '',
      description: '',      
      isPrimary: false
    });
  }

  addNewTechnology() {
    this.newTechnologies.push({
      name: '',
      logo: ''
    });
  }

  removeItem(index: number) {
    this.imageItems.splice(index, 1);
  }

  removeNewTechnology(index: number) {
    this.newTechnologies.splice(index, 1);
  }

  onFileSelected(event: Event, item: ImageItem) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    item.file = file;
    item.imageUrl = file.name;  
  }

  setPrimary(selectedItem: ImageItem) {
    this.imageItems.forEach(item => {
      item.isPrimary = false;
    });

    selectedItem.isPrimary = true;
  }


  salvarProject() { 
    
    if(this.verificarPreenchimento()) {
      this.existingTechnologies.forEach ((tech) => {
        if(tech.selected && tech.id !== undefined) {          
          this.project.technologies.push({id: tech.id});    
        }
      });

      this.newTechnologies.forEach ((tech) => {        
          this.project.technologies.push({ name: tech.name, url: tech.logo });            
      });

      this.imageItems.forEach ((image) => { 
        
        this.project.images.push(            { 
            file: image.file,
            imageUrl: image.imageUrl,
            alt: image.alt,
            cloudinaryId: image.cloudinaryId,
            description: image.description,
            order: image.isPrimary ? 0 : undefined //Confirmar se isso vai dar certo
          }
        )
      });
      
      if(this.projectId === null) {
        console.log("Não foi possivel obter o projectId");
        return;
      }
      
      this.projectService.updateProject(this.project, this.projectId).subscribe({
        next: (res) => {                   
          this.mostrarModalComComando('Sucesso', 'Projeto atualizado com sucesso', 'Ok', '/');
          //Atualiza a tela
          this.cdr.detectChanges();          
        },
        error: (err) => {
          console.error("Erro", err);
        }
      });

    }       
  
  
  }


  verificarPreenchimento():boolean {

    //data precisa ser convertida... não usei o ngmodel direto... vou ter que fazer uma string...
    if(this.createdAt) {
      this.project.createdAt = new Date(this.createdAt);
    } 
    
    if (!this.project.title || !this.project.description || !this.createdAt) {
      this.mostrarModal('Erro', 'Preencha todos os dados', 'Ok');
      return false;
    }

    for (const image of this.imageItems) {
      if (!image.imageUrl || !image.alt || !image.description) {      
        this.mostrarModal('Erro', 'Preencha todos os dados', 'Ok');  
        return false; 
      }
    }

    for (const tech of this.newTechnologies) {
      if (!tech.name || tech.logo) {        
        this.mostrarModal('Erro', 'Preencha todos os dados', 'Ok');
        return false; 
      }
    }
    return true;
  }

  goHome() {  
    this.router.navigate(['/']); 
  }



}
