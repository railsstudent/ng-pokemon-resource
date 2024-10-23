import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { PokemonDelta } from '../interfaces/pokemon-control.interface';
import { Ability, DisplayPokemon, Pokemon, Statistics } from '../interfaces/pokemon.interface';

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
  private readonly pokemonIdSub = new BehaviorSubject(1);
  private readonly httpClient = inject(HttpClient);

  readonly pokemon$ =  this.pokemonIdSub
    .pipe(
      switchMap((id) => this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)),
      map((pokemon) => pokemonAdapter(pokemon))
    );

  updatePokemonId(input: PokemonDelta | number) {
    if (typeof input === 'number') {
      this.pokemonIdSub.next(input); 
    } else {
      const potentialId = this.pokemonIdSub.getValue() + input.delta;
      const newId = Math.min(input.max, Math.max(input.min, potentialId));
      this.pokemonIdSub.next(newId); 
    }
  }
}
