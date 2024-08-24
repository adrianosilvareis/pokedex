import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { PokedexAppComponent } from './pokedex-app.component';
import { routes } from './pokedex-app.routes';
import { PokemonService } from './pokemon/pokemon.service';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [PokemonService, provideHttpClient(withInterceptorsFromDi())],
  declarations: [PokedexAppComponent],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
