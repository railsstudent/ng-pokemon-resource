import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, map, Observable } from "rxjs";

export const searchInput = (minPokemonId = 1, maxPokemonId = 100) => {
  return (source: Observable<number>) => source.pipe(
      debounceTime(300),
      filter((value) => value >= minPokemonId && value <= maxPokemonId),
      map((value) => Math.floor(value)),
      distinctUntilChanged((prev, current) => {
        console.log('distinctUntilChanged', prev, current);
        return prev === current;
      }),
      takeUntilDestroyed()
    );
}
