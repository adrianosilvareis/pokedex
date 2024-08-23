import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PokemonController } from "./pokemon/pokemon.controller";
import { PokemonService } from "./pokemon/pokemon.service";

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokedexApiModule {}
