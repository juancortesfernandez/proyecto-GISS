import { Component } from '@angular/core';
import { CatalogoComponent } from './features/catalogo/catalogo';
import { CatalogoUsuarioComponent } from './features/catalogo-usuario/catalogo-usuario';
import { LoginComponent } from './features/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CatalogoComponent,
    CatalogoUsuarioComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catalogo-tecnologico';
}