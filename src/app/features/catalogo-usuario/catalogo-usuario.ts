import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para if y bucles
import { FormsModule } from '@angular/forms'; // Para escribir en los inputs

@Component({
  selector: 'app-catalogo-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-usuario.html',
  styleUrl: './catalogo-usuario.css'
})
export class CatalogoUsuarioComponent {
  tecnologias = [
    { id: 1, nombre: 'PostgreSQL', proveedor: 'Open Source', estado: 'Activa', permitido: true, recomendado: true, obligatorio: false },
    { id: 2, nombre: 'Amazon Aurora', proveedor: 'AWS', estado: 'Activa', permitido: true, recomendado: true, obligatorio: true },
    { id: 3, nombre: 'Oracle Database', proveedor: 'Oracle', estado: 'Deprecated', permitido: false, recomendado: false, obligatorio: false },
    { id: 4, nombre: 'MySQL', proveedor: 'Oracle', estado: 'Hold', permitido: true, recomendado: false, obligatorio: false },
    { id: 5, nombre: 'DynamoDB', proveedor: 'AWS', estado: 'Activa', permitido: true, recomendado: true, obligatorio: false },
    { id: 6, nombre: 'DB2', proveedor: 'IBM', estado: 'EOL', permitido: false, recomendado: false, obligatorio: false }
  ];

  // Valores seleccionados en los filtros
  filtros = {
    tipologia: 'Backend Spring Boot',
    plataforma: 'AWS',
    dominio: 'Base de Datos'
  };

  // Control de apertura/cierre de desplegables
  desplegables = {
    tipologia: false,
    plataforma: false,
    dominio: false
  };

  textoBusqueda: string = ''; // Se conecta con html para el buscador y cuando el usuario escribe, se actualiza esta propiedad
  techSeleccionada: any = null; // Guarda la tecnología seleccionada para mostrar en el modal

  // Alternar apertura/cierre de desplegables
  toggleDesplegable(seccion: 'tipologia' | 'plataforma' | 'dominio') {
    this.desplegables[seccion] = !this.desplegables[seccion];
  }

  // Seleccionar una opción del desplegable
  seleccionarOpcion(seccion: 'tipologia' | 'plataforma' | 'dominio', valor: string) {
    this.filtros[seccion] = valor;
    this.desplegables[seccion] = false; // Cierra el desplegable después de seleccionar
  }

  // Filtro de búsqueda
  get tecnologiasFiltradas() {
    if (!this.textoBusqueda) return this.tecnologias; // Si el buscador está vacío, muestra todas
    
    const busqueda = this.textoBusqueda.toLowerCase(); // filter crea un nuevo array solo con las tecnologías que cumplen esa condición
    return this.tecnologias.filter(tech => 
      tech.nombre.toLowerCase().includes(busqueda) ||
      tech.proveedor.toLowerCase().includes(busqueda)
    );
  }

  verDetalles(tech: any) { // Guarda la tecnología seleccionada para que el modal pueda mostrarla
    this.techSeleccionada = tech;
  }

  cerrarDetalles() {
    this.techSeleccionada = null;
  }
}
