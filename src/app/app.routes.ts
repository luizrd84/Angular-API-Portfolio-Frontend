import { Routes } from '@angular/router';
import { authGuard } from './guards/authGuard';

export const routes: Routes = [
     {
        path: '',
        loadComponent: () =>
        import('./pages/home/home')
            .then(c => c.Home)
    },
    {
        path: 'sobre',
        loadComponent: () =>
        import('./pages/about/about')
            .then(c => c.About)
    },
    {
        path: 'projetos/:id',
        loadComponent: () =>
        import('./pages/view-project/view-project')
            .then(c => c.ViewProject)
    },
    {
        path: 'projetos/edit/:id',
        loadComponent: () =>
        import('./pages/edit-project/edit-project')
            .then(c => c.EditProject),
            canActivate: [authGuard] 
    },
    {
        path: 'login',
        loadComponent: () =>
        import('./pages/login/login')
            .then(c => c.Login)
    },
    {
        path: 'adicionarprojeto',
        loadComponent: () =>
        import('./pages/add-new-project/add-new-project')
            .then(c => c.AddNewProject),
        canActivate: [authGuard]
    }

    //vai ter o de editar tambem que vai usar o guard

    
];
