import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TechnologyModel } from '../../models/technologyModel';
import { ProjectService } from '../../services/projectService';
import { CreateProjectDTO } from '../../models/createProjectDTO';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { inject } from '@angular/core';
import { MessageModal } from '../../components/message-modal/message-modal';
import { viewChild } from '@angular/core';

interface ImageItem {
  file?: File;
  imageUrl?: string;
  alt: string;
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
  selector: 'app-add-new-project',
  imports: [FormsModule, MessageModal],
  templateUrl: './add-new-project.html',
  styleUrl: './add-new-project.css',
})
export class AddNewProject {

  imageItems: ImageItem[] = [];
  //já vindas do banco - NgModel
  existingTechnologies: TechnologyItem[] = [];
  //novas que o usuário vai adicionar - NgModel
  newTechnologies: TechnologyItem[] = [];
  //Lista com dados recebidos do backend
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


  //Rotas, não usar no construtor. Evita erros
  private router = inject(Router);

  //Modal para exibir mensagens na tela
  modal = viewChild<MessageModal>('modal');

  constructor(private http: HttpClient, private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {

  }
 
  
  ngOnInit() {
    this.carregarTecnologias();   
  }

  mostrarModal(title:string, message:string, button:string) { 
    const modalInstance = this.modal();   
    modalInstance!.showModal(title, message, button);     
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


  enviarProject() { 
    
    if(this.verificarPreenchimento()) {
      this.existingTechnologies.forEach ((tech) => {
        if(tech.selected && tech.id !== undefined) {
          console.log("incluiu um no array");
          this.project.technologies.push({id: tech.id});    
        }
      });

      this.newTechnologies.forEach ((tech) => {        
          this.project.technologies.push({ name: tech.name, url: tech.logo });            
      });

      this.imageItems.forEach ((image) => { 
        this.project.images.push(  
          { 
            file: image.file,
            imageUrl: image.imageUrl,
            alt: image.alt,
            description: image.description,
            order: image.isPrimary ? 0 : undefined //Confirmar se isso vai dar certo
          }
        )
      });
      
      
      // this.projectService.postProject(this.project);
      this.projectService.postProject(this.project).subscribe({
        next: (res) => {
          this.limparDadosTela();
          this.mostrarModal('Sucesso', 'Projeto cadastrado com sucesso.', 'Ok');
          //Atualiza a tela
          this.cdr.detectChanges();          
        },
        error: (err) => {
          console.error("Erro", err);
        }
      });

    }   


  }

  limparDadosTela(){
    this.project = {
      title: '',
      description: '',
      createdAt: new Date(),
      technologies: [],
      images: []
    };
    this.createdAt = "";
    this.imageItems = [];
    this.newTechnologies = [];
    this.existingTechnologies.forEach((tech) => {
      tech.selected = false;
    })    

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
