
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-abilities',
  standalone: true,
  imports: [],
  template: `
    <div style="padding: 0.5rem;">
      <p>Abilities</p>
      @for (ability of pokemon().abilities; track ability.name) {
        <div class="abilities-container">
          <label>
            <span style="font-weight: bold; color: #aaa">Name: </span>
            <span>{{ ability.name }}</span>
          </label>
          <label>
            <span style="font-weight: bold; color: #aaa">Is hidden? </span>
            <span>{{ ability.isHidden ? 'Yes' : 'No' }}</span>
          </label>
        </div>
      }
    </div>
    `,
  styles: [`
    .abilities-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .abilities-container > * {
      flex-grow: 1;
      flex-basis: calc(100% / 2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAbilitiesComponent {
  pokemon = input.required<DisplayPokemon>();
}
