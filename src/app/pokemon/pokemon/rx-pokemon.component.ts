import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { searchInput } from '../custom-operators/search-input.operator';
import { PokemonControlsComponent } from '../pokemon-controls/pokemon-control.component';
import { PokemonPersonalComponent } from '../pokemon-personal/pokemon-personal.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';
import { RxPokemonService } from '../services/rx-pokemon.service';

@Component({
  selector: 'app-rx-pokemon',
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
export default class RxPokemonComponent {
  private readonly pokemonService = inject(RxPokemonService);
  pokemon = this.pokemonService.pokemonRxResource;  
  pokemonId = signal(1)
  title = 'Display the first 100 pokemon images (rxResource)';

  constructor() {
    toObservable(this.pokemonId).pipe(searchInput())
      .subscribe((value) => this.pokemonService.updatePokemonId(value));
  }
} 
