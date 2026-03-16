import { Component, signal } from '@angular/core';
import { CatalogoComponent } from './features/catalogo/catalogo';

// Componente padre (raíz)

@Component({
  selector: 'app-root',
  imports: [CatalogoComponent], // Importo el hijo, para que Angular lo reconozca.
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catalogo-tecnologico');
}
