import { Component, signal } from '@angular/core';
import { CatalogoComponent } from './features/catalogo/catalogo';
import { CatalogoUsuarioComponent } from './features/catalogo-usuario/catalogo-usuario'; 

// Componente padre (raíz)

@Component({
  selector: 'app-root',
  imports: [CatalogoComponent, CatalogoUsuarioComponent  ], // Importo el hijo, para que Angular lo reconozca.
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catalogo-tecnologico');
}
