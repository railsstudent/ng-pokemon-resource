import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'rx-resource',
        loadComponent: () => import('./pokemon/pokemon/rx-pokemon.component'),
        data: {
            useRxResource: true
        }
    },
    {
        path: 'resource',
        loadComponent: () => import('./pokemon/pokemon/pokemon.component'),
        data: {
            useRxResource: false
        }
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
