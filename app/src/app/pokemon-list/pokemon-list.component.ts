import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, take } from 'rxjs/operators';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonDetailsComponent, ReactiveFormsModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  service = inject(PokemonService);
  pokemonNamesList: string[] = [];

  search = new FormControl('');

  ngOnInit() {
    this.list();
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.listByName.bind(this));
  }

  listByName() {
    this.service
      .listByName(this.search.value ?? '')
      .pipe(take(1))
      .subscribe((response: any) => {
        this.pokemonNamesList = response;
      });
  }

  list(offset = 0) {
    this.service
      .listPokemon(offset)
      .pipe(take(1))
      .subscribe((response: any) => {
        this.pokemonNamesList.push(...response);
      });
  }

  loadMore() {
    this.list(this.pokemonNamesList.length);
  }
}
