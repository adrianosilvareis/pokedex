import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class PokemonService {
  constructor(private client: HttpClient) {}

  getByName(name: string) {
    return this.client.get(`${environment.BASE_URL}/${name}`);
  }

  listPokemon(offset = 0) {
    return this.client.get(`${environment.BASE_URL}/list?offset=${offset}`);
  }

  listByName(search: string) {
    return this.client.get(`${environment.BASE_URL}/list/${search}`);
  }
}
