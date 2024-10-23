import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-personal',
  standalone: true,
  template:`
    <div class="pokemon-container" style="padding: 0.5rem;">
      @for (data of personalData(); track data.text) {
        <label>
          <span style="font-weight: bold; color: #aaa">{{ data.text }}</span>
          <span>{{ data.value }}</span>
        </label>
      }
    </div>`,
  styles: [`
    .pokemon-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPersonalComponent {
  pokemon = input.required<DisplayPokemon>();
  
  personalData = computed(() => {
    const { id, name, height, weight } = this.pokemon();
    return [
      { text: 'Id: ', value: id },
      { text: 'Name: ', value: name },
      { text: 'Height: ', value: height },
      { text: 'Weight: ', value: weight },
    ];
  });
}
