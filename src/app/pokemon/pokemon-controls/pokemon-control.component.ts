
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';
import { searchInput } from './custom-operators/search-input.operator';

@Component({
  selector: 'app-pokemon-controls',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      @for (delta of [-2, -1, 1, 2]; track delta) {
        @let buttonText = delta < 0 ? delta : '+' + delta;
        <button class="btn" (click)="updatePokemonId(delta)">{{ buttonText }}</button>
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
  readonly min = 1;
  readonly max = 100;

  pokemonService = inject(PokemonService);
  search = signal(1);

  updatePokemonId(delta: number) {
    this.pokemonService.updatePokemonId({ delta, min: this.min, max: this.max })
  }

  constructor() {
    toObservable(this.search)
      .pipe(searchInput(this.min, this.max))
      .subscribe((value) => this.pokemonService.updatePokemonId(value));
  }
}
