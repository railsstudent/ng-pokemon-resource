import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'rx-resource',
        loadComponent: () => import('./pokemon/pokemon/rx-pokemon.component')
    },
    {
        path: 'resource',
        loadComponent: () => import('./pokemon/pokemon/pokemon.component')
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rx-resource'
    },
    {
        path: '**',
        redirectTo: 'rx-resource'
    }
];

export const navLinks = [
    {
      link: 'Pokemon RxResource',
      path: ['rx-resource'],
    },
    {
      link: 'Pokemon Resource',
      path: ['resource'],
    },
  ];
