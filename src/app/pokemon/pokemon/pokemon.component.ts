import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonControlsComponent } from '../pokemon-controls/pokemon-control.component';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';
import { PokemonService } from '../services/pokemon.service';

const initialValue: DisplayPokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  backShiny: '',
  frontShiny: '',
  abilities: [],
  stats: [],
};

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PokemonControlsComponent, PokemonPersonalComponent, PokemonTabComponent],
  template: `
    <h2>Display the first 100 pokemon images</h2>
    <div>
        <div class="container">
          <img [src]="pokemon().frontShiny" />
          <img [src]="pokemon().backShiny" />
        </div>
        <app-pokemon-personal [pokemon]="pokemon()"></app-pokemon-personal>
        <app-pokemon-tab [pokemon]="pokemon()"></app-pokemon-tab>
    </div>
    <app-pokemon-controls></app-pokemon-controls>
  `,
  styles: [`
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent {
  pokemonService = inject(PokemonService);
  pokemon = toSignal(this.pokemonService.pokemon$, { initialValue });
}
