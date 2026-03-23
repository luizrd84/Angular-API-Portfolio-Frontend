import { ImageModel } from "./imageModel";
import { TechnologyModel } from "./technologyModel";

export interface ProjectModel {
  id: number;
  title: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt: Date;
  images?: ImageModel[];
  technologies?: TechnologyModel[];
}


//Assim, seu ProjectService pode usar Project[] como tipo de retorno.

