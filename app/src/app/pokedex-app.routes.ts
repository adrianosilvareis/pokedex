import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pokemon/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
];
