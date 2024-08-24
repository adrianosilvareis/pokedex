import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { PokemonService } from '../pokemon/pokemon.service';
import { PokemonDetailsComponent } from './pokemon-details.component';

describe('PokemonDetailsComponent', () => {
  it('should render name correctly', async () => {
    await setup();
    const title = await screen.findByTestId('title');
    expect(title.textContent).toBe('pikachu');
  });

  it('should render image correctly', async () => {
    await setup();
    const image = await screen.findByTestId<HTMLImageElement>('image');
    expect(image.src).toBe('http://localhost/image-url');
  });

  it('should render details stats on click in the card', async () => {
    const { instance } = await setup();
    const card = await screen.findByTestId('card');

    expect(instance.isOpened).toBeFalsy();
    card.click();
    expect(instance.isOpened).toBeTruthy();
  });

  it('should render stats when card is opened', async () => {
    await setup();
    const card = await screen.findByTestId('card');
    card.click();
    const stats = await screen.findAllByTestId('stats');
    expect(stats).toHaveLength(2);
    expect(stats.at(0)?.textContent).toContain('hp: 50');
    expect(stats.at(1)?.textContent).toContain('attack: 100');
  });

  it('should render abilities when card is opened', async () => {
    await setup();
    const card = await screen.findByTestId('card');
    card.click();
    const abilities = await screen.findAllByTestId('abilities');
    expect(abilities).toHaveLength(2);
    expect(abilities.at(0)?.textContent).toContain('ability-1');
    expect(abilities.at(1)?.textContent).toContain('ability-2');
  });
});

async function setup() {
  const content = await render(PokemonDetailsComponent, {
    componentInputs: {
      name: 'pikachu',
    },
    providers: [
      {
        provide: PokemonService,
        useValue: {
          listPokemon: jest.fn(() => of(['pikachu'])),
          listByName: jest.fn(() => of(['pikachu'])),
          getByName: jest.fn(() =>
            of({
              abilities: ['ability-1', 'ability-2'],
              image: 'image-url',
              stats: [
                { name: 'hp', value: 50 },
                { name: 'attack', value: 100 },
              ],
            })
          ),
        },
      },
    ],
  });

  const fixture = content.fixture;
  const instance = fixture.componentInstance;

  return {
    fixture,
    instance,
  };
}
