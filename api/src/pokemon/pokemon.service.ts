import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { Pokemon } from "./interfaces/pokemon.interface";

@Injectable()
export class PokemonService {
  private readonly baseUrl = process.env.POKEAPI;

  constructor(private readonly httpService: HttpService) {}

  async getAll(offset: number = 0): Promise<string[]> {
    const { data } = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}?limit=10&offset=${offset}`)
    );
    return data.results.map(({ name }) => name);
  }

  async listByName(search: string): Promise<string[]> {
    const { data } = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}?limit=1000&offset=0`)
    );
    return data.results
      .map(({ name }) => name)
      .filter((name) => name.includes(search));
  }

  async getByName(name: string): Promise<Pokemon> {
    const { data } = await lastValueFrom(
      this.httpService.get(`${this.baseUrl}/${name}`)
    );
    return {
      abilities: data.abilities.map(({ ability }) => ability.name),
      image: data.sprites.front_default,
      stats: data.stats.map(({ base_stat, stat }) => ({
        name: stat.name,
        value: base_stat
      }))
    };
  }
}
