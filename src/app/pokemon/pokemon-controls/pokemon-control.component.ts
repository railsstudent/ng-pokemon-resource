import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { POKEMON_MAX, POKEMON_MIN } from '../constants/pokemon.constant';

@Component({
  selector: 'app-pokemon-controls',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      @for (delta of [-2, -1, 1, 2]; track delta) {
        @let buttonText = delta < 0 ? delta : '+' + delta;
        <button (click)="incrementPokemonId(delta)">{{ buttonText }}</button>
      }
      <input type="number" [(ngModel)]="search" name="searchId" id="searchId" />
    </div>
    `,
  styles: [`
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 1rem;
    }

    input[type="number"] {
      padding: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonControlsComponent {
  search = model.required<number>();

  incrementPokemonId(delta: number) {
    this.search.update((prev) =>  Math.min(POKEMON_MAX, Math.max(POKEMON_MIN, prev + delta)));
  }
}
