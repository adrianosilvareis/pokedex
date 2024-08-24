import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/angular';
import { of } from 'rxjs';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokemonService } from '../pokemon/pokemon.service';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  let content: RenderResult<PokemonListComponent, PokemonListComponent>;

  it('should load more pokemon with a size of current pokemon list as offset', async () => {
    const { instance, loadMoreButton } = await setup();

    const listPokemonSpy = instance.service.listPokemon;

    loadMoreButton.click();

    expect(listPokemonSpy).toHaveBeenCalledTimes(2);

    expect(listPokemonSpy).toHaveBeenCalledWith(1);
  });

  it('should call listByName when search value changes', async () => {
    const { instance, searchInput } = await setup();

    const listByNameSpy = instance.service.listByName;

    fireEvent.input(searchInput, { target: { value: 'pikachu' } });

    await waitFor(() => expect(listByNameSpy).toHaveBeenCalledWith('pikachu'));
  });

  it('should list pokemon on init', async () => {
    await setup();

    const list = await screen.findAllByText('pikachu');

    expect(list).toHaveLength(1);
  });
});

async function setup() {
  const content = await render(PokemonListComponent, {
    providers: [
      {
        import: [PokemonDetailsComponent],
        provide: PokemonService,
        useValue: {
          listPokemon: jest.fn(() => of(['pikachu'])),
          listByName: jest.fn(() => of(['pikachu'])),
          getByName: jest.fn(() => of(['pikachu'])),
        },
      },
    ],
  });
  const fixture = content.fixture;
  const instance = content.fixture.componentInstance;
  const searchInput = await screen.getByTestId<HTMLInputElement>('search');
  const loadMoreButton = await screen.getByTestId('more-load');
  return {
    content,
    instance,
    fixture,
    searchInput,
    loadMoreButton,
  };
}
