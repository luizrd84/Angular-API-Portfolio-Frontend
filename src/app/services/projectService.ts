import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../models/projectModel';
import { ImageModel } from '../models/imageModel';
import { TechnologyModel } from '../models/technologyModel';
import { CreateProjectDTO } from '../models/createProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${this.apiUrl}/projects/getAllProjects`);
  }

  getProjectById(projectId: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(`${this.apiUrl}/projects/getProjectById/${projectId}`);
  }

  getImagesByProjectId(projectId: number):Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(`${this.apiUrl}/images/getImagesByProjectId/${projectId}`);
  }

  uploadImage(data: any) {
    return this.http.post(`${this.apiUrl}/images/upload`, data);
  }

  getAllImages():Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(`${this.apiUrl}/images/getAllImages`);
  }

  getAllTechnologies():Observable<TechnologyModel[]> {
    return this.http.get<TechnologyModel[]>(`${this.apiUrl}/technologies/getAllTechnologies`);
  }

  getTecnologiesByProjectId(projectId: number):Observable<TechnologyModel[]> {
    return this.http.get<TechnologyModel[]>(`${this.apiUrl}/technologies/getTechnologiesByProjectId/${projectId}`);
  }

  getTechnologiesOfAllProjects():Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${this.apiUrl}/technologies/getTechnologiesOfAllProjects`);
  }

  postProject(data: CreateProjectDTO): Observable<any> {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('createdAt', data.createdAt.toISOString());

    if (data.githubUrl) {
      formData.append('githubUrl', data.githubUrl);
    }

    if (data.demoUrl) {
      formData.append('demoUrl', data.demoUrl);
    }

    //Tecnologias
    formData.append('technologies', JSON.stringify(data.technologies));

    //Listas para enviar no final como um Json
    const imagesMeta: any[] = [];
    const imagesWithoutFile: any[] = [];

    data.images.forEach((image) => {
      if (image.file) {
        formData.append('images', image.file);

        imagesMeta.push({
          alt: image.alt,
          description: image.description,
          order: image.order
        });

      } else {
        imagesWithoutFile.push({
          imageUrl: image.imageUrl,
          alt: image.alt,
          description: image.description,
          order: image.order
        });
      }
    });

    if (imagesMeta.length > 0) {
      formData.append('imagesMeta', JSON.stringify(imagesMeta));
    }

    if (imagesWithoutFile.length > 0) {
      formData.append('imageUrls', JSON.stringify(imagesWithoutFile));
    }

    console.log("enviando o post de criação...")
    console.log(formData);

    return this.http.post(`${this.apiUrl}/projects/createProject`, formData);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/deleteProjectById/${projectId}`);
  }














  //Em desenvolvimento:

  updateProject(data: CreateProjectDTO, projectId:number): Observable<any> {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('createdAt', data.createdAt.toISOString());

    if (data.githubUrl) {
      formData.append('githubUrl', data.githubUrl);
    }

    if (data.demoUrl) {
      formData.append('demoUrl', data.demoUrl);
    }

    //Tecnologias
    formData.append('technologies', JSON.stringify(data.technologies));

    //Listas para enviar no final como um Json
    const imagesMeta: any[] = [];
    const imagesWithoutFile: any[] = [];

    data.images.forEach((image) => {
      if (image.file) {
        formData.append('images', image.file);

        imagesMeta.push({
          alt: image.alt,
          description: image.description,
          order: image.order
        });

      } else {
        imagesWithoutFile.push({
          imageUrl: image.imageUrl,
          alt: image.alt,          
          cloudinaryId: image.cloudinaryId,
          description: image.description,
          order: image.order
        });
      }
    });

    if (imagesMeta.length > 0) {
      formData.append('imagesMeta', JSON.stringify(imagesMeta));
    }

    if (imagesWithoutFile.length > 0) {
      formData.append('imageUrls', JSON.stringify(imagesWithoutFile));
    }

    console.log("enviando o project update...")
    console.log(formData);

    return this.http.put(`${this.apiUrl}/projects/edit/${projectId}`, formData);
  }




     
 

  
  // deleteSingleImage(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/images/deleteSingleImage/${id}`);
  // }


  

    /* EXEMPLOS:
    deleteImage(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/images/${id}`);
}
  no componente:
  this.imageService.deleteImage(id).subscribe({
  next: () => console.log('Deletado com sucesso'),
  error: err => console.error(err)
});

updateImage(id: number, image: ImageModel): Observable<ImageModel> {
  return this.http.put<ImageModel>(
    `${this.apiUrl}/images/${id}`,
    image
  );
}
  no componente:
  this.imageService.updateImage(1, image).subscribe({
  next: updated => console.log(updated),
  error: err => console.error(err)
});


    */

    //deletar do banco o projeto apenas... 

    
    // fluxo ideal:
    // const imagens = await repo.getImages(id);
    // // deleta todas e espera terminar
    // await Promise.all(
    //   imagens.map(img => this.storage.delete(img.path))
    // );
    // // agora sim deleta o projeto
    // await repo.deleteProject(id);

  

  // deleteProjectTechnology() {

  // }



  
  //esses abaixo, não tenho rotas no backend ainda... mas vou precisar:
  //todos os deletes, já estão funcionando dentro de delete project, pois fazem tudo, 
  //preciso separado tambem

  // postProjectImage() {
  //   //modificar o upload image apenas???? ver melhor isso.
  // }

  // postTechnology() {
  //   //fazer dentro do postProjectTechnology a principio, pois não faz sentido fazer separado
  // }

  // postProjectTechnology() {

  // } 

  // deleteProjectImage() {

  // }  



}