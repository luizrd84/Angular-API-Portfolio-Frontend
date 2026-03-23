export interface CreateProjectDTO {
  title: string;
  description: string;  
  createdAt: Date;
  githubUrl?: string;
  demoUrl?: string;

  technologies: (
    | { id: number }
    | { name: string, url: string }
  )[];

  images: {
    file?: File,
    imageUrl?: string,
    alt: string,
    cloudinaryId?: string;
    description: string,
    order?: number
  } [];
}