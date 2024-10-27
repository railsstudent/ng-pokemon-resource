import { HttpClient } from '@angular/common/http';
import { Injectable, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, delay, map, of } from 'rxjs';
import { Ability, Pokemon, Statistics } from '../interfaces/pokemon.interface';
import { DisplayPokemon } from './../interfaces/pokemon.interface';

const pokemonAdapter = (pokemon: Pokemon): DisplayPokemon => {
  const { id, name, height, weight, sprites, abilities: a, stats: statistics } = pokemon;

  const abilities: Ability[] = a.map(({ ability, is_hidden }) => ({
    name: ability.name,
    isHidden: is_hidden
  }));

  const stats: Statistics[] = statistics.map(({ stat, effort, base_stat }) => ({
    name: stat.name,
    effort,
    baseStat: base_stat,
  }));

  return {
    id,
    name,
    height,
    weight,
    backShiny: sprites.back_shiny,
    frontShiny: sprites.front_shiny,
    abilities,
    stats,
  }
} 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);

  private readonly pokemonId = signal(1);
  private readonly rxPokemonId = signal(1);

  readonly pokemonResource = resource<DisplayPokemon, number>({
    request: () => this.pokemonId(),
    loader: async ({ request: id, abortSignal }) => { 
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { signal: abortSignal });
        const result = await response.json() as Pokemon
        return pokemonAdapter(result);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  });

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

  updatePokemonId(input: number, useRxResource: boolean) {
    console.log('useRxResource', useRxResource);
    if (useRxResource) {
      this.rxPokemonId.set(input); 
    } else {
      this.pokemonId.set(input);
    }
  }
}
