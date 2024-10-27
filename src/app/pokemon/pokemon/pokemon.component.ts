import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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
  useRxResource = input(false);
  pokemon = inject(PokemonService).pokemonResource;
  title = 'Display the first 100 pokemon images';
}
