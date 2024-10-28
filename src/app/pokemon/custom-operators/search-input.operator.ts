import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, map, Observable } from "rxjs";
import { POKEMON_MAX, POKEMON_MIN } from '../constants/pokemon.constant';

export const searchInput = (minPokemonId = POKEMON_MIN, maxPokemonId = POKEMON_MAX) => {
  return (source: Observable<number>) => source.pipe(
      debounceTime(300),
      filter((value) => value >= minPokemonId && value <= maxPokemonId),
      map((value) => Math.floor(value)),
      distinctUntilChanged(),
      takeUntilDestroyed()
    );
}
