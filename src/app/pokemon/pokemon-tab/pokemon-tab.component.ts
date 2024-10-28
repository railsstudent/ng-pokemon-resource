import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonAbilitiesComponent } from '../pokemon-abilities/pokemon-abilities.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';

type RenderComponent = {
  id: number;
  component: typeof PokemonStatsComponent | typeof PokemonAbilitiesComponent;
}

const statComponent = { id: 1, component: PokemonStatsComponent };
const abilityComponent = { id: 2 , component: PokemonAbilitiesComponent }

@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    <div style="padding: 0.5rem;">
      <div>
        <div>
          <input id="all" name="type" type="radio" (click)="selectComponents('all')" checked />
          <label for="all">All</label>
        </div>
        <div>
          <input id="stats" name="type" type="radio" (click)="selectComponents('statistics')" />
          <label for="stats">Stats</label>
        </div>
        <div>
          <input id="ability" name="type" type="radio" (click)="selectComponents('abilities')" />
          <label for="ability">Abilities</label>
        </div>
      </div>
    </div>
    @for (item of dynamicComponents; track item.id) {
      <ng-container *ngComponentOutlet="item.component; inputs: { pokemon: pokemon() }"></ng-container>
    }
    `,
  styles: [`
    input[type="radio"] {
      margin-right: 0.25rem;
    }

    div > div {
      display: flex;
      div {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: calc(100% / 3);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTabComponent {
  PokemonAbilitiesComponent = PokemonAbilitiesComponent;
  PokemonStatsComponent = PokemonStatsComponent;

  pokemon = input.required<DisplayPokemon>();
  
  componentMap: Record<string, RenderComponent[]> = {
    'statistics': [statComponent],
    'abilities': [abilityComponent],
    'all': [statComponent, abilityComponent],
  }

  dynamicComponents = this.componentMap['all'];

  selectComponents(type: string) {
    const components = this.componentMap[type];
    if (components !== this.dynamicComponents) {
      this.dynamicComponents = components;
    }
  }
}
