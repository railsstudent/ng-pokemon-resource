import { Component, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonComponent],
  template: `
    <h2>Version: {{ version }}</h2>
    <app-pokemon />
  `,
})
export class AppComponent {
  version = VERSION.full;

  constructor(titleService: Title) {
    titleService.setTitle('Pokemon Signal Resource Demo');
  }
}
