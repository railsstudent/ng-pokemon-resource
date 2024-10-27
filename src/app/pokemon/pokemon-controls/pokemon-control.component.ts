
import { ChangeDetectionStrategy, Component, model, output, signal } from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { searchInput } from './custom-operators/search-input.operator';
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
  // incrementBy = output<number>();
  // newPokemonId = outputFromObservable(toObservable(this.search).pipe(searchInput()));

  incrementPokemonId(delta: number) {
    this.search.update((prev) =>  Math.min(POKEMON_MAX, Math.max(POKEMON_MIN, prev + delta)));
  }
}
