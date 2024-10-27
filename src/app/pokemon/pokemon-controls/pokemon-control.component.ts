
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Injector, OnInit, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { searchInput } from './custom-operators/search-input.operator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-controls',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      @for (delta of [-2, -1, 1, 2]; track delta) {
        @let buttonText = delta < 0 ? delta : '+' + delta;
        <button (click)="incrementBy.emit(delta)">{{ buttonText }}</button>
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
export class PokemonControlsComponent implements OnInit {
  readonly min = 1;
  readonly max = 100;

  search = signal(1);
  incrementBy = output<number>();
  newPokemonId = output<number>();
  
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);
  
  ngOnInit(): void {
    // toObservable(this.search, { injector: this.injector })
    //   .pipe(
    //     tap((value) => console.log('before', value)),
    //     searchInput(this.min, this.max, this.destroyRef),
    //     tap((value) => console.log('after', value)),
    //   )
    //   .subscribe((value) => { 
    //     console.log('ngOnInit', value);
    //     this.newPokemonId.emit(value);
    //   });
  }
}
