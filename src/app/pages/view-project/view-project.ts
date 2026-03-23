import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Carousel } from '../../components/carousel/carousel';
import { ImageModel } from '../../models/imageModel';
import { TechnologyModel } from '../../models/technologyModel';
import { ProjectService } from '../../services/projectService';
import { forkJoin } from 'rxjs';
import { ProjectModel } from '../../models/projectModel';
import { ChangeDetectorRef } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-project',
  imports: [DatePipe, Carousel],
  templateUrl: './view-project.html',
  styleUrl: './view-project.css',
})
export class ViewProject {
  private router = inject(Router);
 
  project: ProjectModel | null = null;
  images: ImageModel[] = [];
  technologies: TechnologyModel[] = [];
  
  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) {
        console.error("ID não informado na rota");
        return;
      }
      const id = Number(idParam);

      this.loadData(id);
    });
  }

  goHome() {  
    // window.location.href = '/';
    this.router.navigate(['/']); 
  }
  
  loadData(id: number) {
    
    forkJoin({
      images: this.projectService.getImagesByProjectId(id),
      project: this.projectService.getProjectById(id),
      technologies: this.projectService.getTecnologiesByProjectId(id)
    }).subscribe({
      next: ({ images, project, technologies }) => {

        this.images = images;
        this.project = project;
        this.technologies = technologies;

        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("Erro ao carregar dados do projeto", err);
      }
    });

  }
  


}
