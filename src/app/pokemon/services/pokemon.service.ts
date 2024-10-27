import { Injectable, resource, signal } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';
import { pokemonAdapter } from '../pokemon.adapter';
import { DisplayPokemon } from './../interfaces/pokemon.interface';
import { POKEMON_MAX, POKEMON_MIN } from '../constants/pokemon.constant';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonId = signal(1);

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

  updatePokemonId(input: number) {
    this.pokemonId.set(input);
  }

  incrementPokemonId(delta: number) {
    this.pokemonId.update((prev) =>  Math.min(POKEMON_MAX, Math.max(POKEMON_MIN, prev + delta)));
    console.log('incrementPokemonId -> pokemonId', this.pokemonId());
  }
}
