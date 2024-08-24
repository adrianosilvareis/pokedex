import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  describe('PokemonService', () => {
    let pokemonService: PokemonService;
    let httpClient: HttpClient;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          PokemonService,
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      });
      pokemonService = TestBed.inject(PokemonService);
      httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
      expect(pokemonService).toBeTruthy();
    });

    it('should get pokemon by name', () => {
      const pokemonName = 'Pikachu';
      const expectedUrl = `${environment.BASE_URL}/${pokemonName}`;

      jest.spyOn(httpClient, 'get').mockReturnValueOnce(of({}));

      pokemonService.getByName(pokemonName);

      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('should list pokemon with default offset', () => {
      const expectedUrl = `${environment.BASE_URL}/list?offset=0`;

      jest.spyOn(httpClient, 'get').mockReturnValueOnce(of({}));

      pokemonService.listPokemon();

      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('should list pokemon by search term', () => {
      const searchTerm = 'fire';
      const expectedUrl = `${environment.BASE_URL}/list/${searchTerm}`;

      jest.spyOn(httpClient, 'get').mockReturnValueOnce(of({}));

      pokemonService.listByName(searchTerm);

      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
    });
  });
});
