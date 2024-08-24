import { Component, inject, input, OnInit } from '@angular/core';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  name = input('');
  service = inject(PokemonService);

  pokemon!: Pokemon;

  isOpened = false;

  toggle() {
    this.isOpened = !this.isOpened;
  }

  ngOnInit(): void {
    this.service.getByName(this.name()).subscribe((response: any) => {
      this.pokemon = response;
    });
  }
}
