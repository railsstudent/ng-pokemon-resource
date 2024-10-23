import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-personal',
  standalone: true,
  imports: [NgTemplateOutlet],
  template:`
    <div class="pokemon-container" style="padding: 0.5rem;">
      <ng-container *ngTemplateOutlet="details; context: { $implicit: personalData() }"></ng-container>
    </div>
    <ng-template #details let-personalData>
      @for (data of personalData; track data) {
        <label>
          <span style="font-weight: bold; color: #aaa">{{ data.text }}</span>
          <span>{{ data.value }}</span>
        </label>
      }
    </ng-template>
    `,
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
  personalData = inject(PokemonService).personalData;
}
