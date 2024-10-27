import { Ability, DisplayPokemon, Pokemon, Statistics } from './interfaces/pokemon.interface';

export const pokemonAdapter = (pokemon: Pokemon): DisplayPokemon => {
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
 