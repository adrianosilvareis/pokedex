import { NestFactory } from "@nestjs/core";
import { PokedexApiModule } from "./pokedex-api.module";

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule, { cors: true });
  app.setGlobalPrefix("api");
  await app.listen(3000);
}

bootstrap();
