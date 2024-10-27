import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { delay, map, switchMap } from 'rxjs';
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
  readonly pokemon$ =  toObservable(this.pokemonId)
    .pipe(
      switchMap((id) => this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)),
      map((pokemon) => pokemonAdapter(pokemon))
    );

  pokemonRxResource = rxResource<DisplayPokemon, number>({
    request: () => this.pokemonId(),
    loader: ({ request: id }) => { 
      console.log('id', id);
      return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .pipe(
          delay(1000),
          map((pokemon) => pokemonAdapter(pokemon)),
        )
    }
  });

  updatePokemonId(input: number) {
    this.pokemonId.set(input); 
  }
}
