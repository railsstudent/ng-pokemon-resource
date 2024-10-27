import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, delay, map, of } from 'rxjs';
import { DisplayPokemon, Pokemon } from '../interfaces/pokemon.interface';
import { pokemonAdapter } from '../pokemon.adapter';

@Injectable({
  providedIn: 'root'
})
export class RxPokemonService {
  private readonly httpClient = inject(HttpClient);
  private readonly rxPokemonId = signal(1);

  readonly pokemonRxResource = rxResource<DisplayPokemon | undefined, number>({
    request: () => this.rxPokemonId(),
    loader: ({ request: id }) =>  this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        delay(1000),
        map((pokemon) => pokemonAdapter(pokemon)),
        catchError((e) => {
          console.error(e);
          return of(undefined);
        })
      )
  });

  updatePokemonId(input: number) {
    this.rxPokemonId.set(input); 
  }
}
