import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, delay, map, of } from 'rxjs';
import { DisplayPokemon, Pokemon } from '../interfaces/pokemon.interface';
import { pokemonAdapter } from '../pokemon.adapter';
import { POKEMON_MAX, POKEMON_MIN } from '../constants/pokemon.constant';

@Injectable({
  providedIn: 'root'
})
export class RxPokemonService {
  private readonly httpClient = inject(HttpClient);
  private readonly rxPokemonId = signal(1);

  readonly pokemonRxResource = rxResource<DisplayPokemon | undefined, number>({
    request: () => this.rxPokemonId(),
    loader: ({ request: id }) =>  { 
      console.log('id', id);
      return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .pipe(
          delay(500),
          map((pokemon) => pokemonAdapter(pokemon)),
          catchError((e) => {
            console.error(e);
            return of(undefined);
          })
        );
    }
  });

  updatePokemonId(input: number) {
    console.log('updatePokemonId -> input', input);
    this.rxPokemonId.set(input); 
  }

  incrementPokemonId(delta: number) {
    this.rxPokemonId.update((prev) =>  Math.min(POKEMON_MAX, Math.max(POKEMON_MIN, prev + delta)));
    console.log('incrementPokemonId -> rxPokemonId', this.rxPokemonId());
  }
}
