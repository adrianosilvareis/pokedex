import { Component } from '@angular/core';

@Component({
  selector: 'pokedex',
  template: `
    <h1 class="text-center bg-blue-500 py-4 text-white mb-4">Pokedex</h1>

    <router-outlet></router-outlet>
  `,
})
export class PokedexAppComponent {}
