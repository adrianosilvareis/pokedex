import { Controller, Get, Param, Query } from "@nestjs/common";
import { Pokemon } from "./interfaces/pokemon.interface";
import { PokemonService } from "./pokemon.service";

@Controller("pokemon")
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get("list")
  getAll(@Query() query: { offset: number }): Promise<string[]> {
    return this.pokemonService.getAll(query.offset);
  }

  @Get("list/:search")
  listByName(@Param("search") search: string): Promise<string[]> {
    return this.pokemonService.listByName(search);
  }

  @Get(":name")
  getByName(@Param("name") name: string): Promise<Pokemon> {
    return this.pokemonService.getByName(name);
  }
}
