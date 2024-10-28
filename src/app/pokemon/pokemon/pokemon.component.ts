import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { searchInput } from '../custom-operators/search-input.operator';
import { PokemonControlsComponent } from '../pokemon-controls/pokemon-control.component';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [PokemonControlsComponent, PokemonPersonalComponent, PokemonTabComponent],
  templateUrl: './pokemon.component.html',
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
  private readonly pokemonService = inject(PokemonService);
  pokemonId = signal(1);
  pokemon = this.pokemonService.pokemonResource;
  title = 'Display the first 100 pokemon images';

  constructor() {
    toObservable(this.pokemonId).pipe(searchInput())
      .subscribe((value) => this.pokemonService.updatePokemonId(value));
  }
}
