import '@angular/compiler'; // Carga el compilador de Angular
import { Component } from '@angular/core'; // Importa herraminetas de Angular para crear componentes
import { FormsModule } from '@angular/forms';

// Lógica del catálogo0

@Component({ // Anotación que hace de etiqueta que dice que es un componente
  selector: 'app-catalogo', // Nombre HTML para usar este componente (como un ID del componente), así lo podré llamar desde otrors HTML
  standalone: true, // El componente funciona por sí mismo, no necesita un padre para funcionar
  imports: [FormsModule], // Esto sería para importar otros componentes, en este caso, de momento, no uso ninguno
  templateUrl: './catalogo.html', //Ruta del HTML que usa
  styleUrl: './catalogo.css' // Ruta del CSS que usa
})

export class CatalogoComponent { // Este componente está disponible para que otros lo usen

  tecnologias = [ // Array con tecnologías de prueba
    { id: 1, nombre: 'PostgreSQL', proveedor: 'Open Source', estado: 'Activa', permitido: false, recomendado: false, obligatorio: false},
    { id: 2, nombre: 'Amazon Aurora', proveedor: 'AWS', estado: 'Activa', permitido: false, recomendado: false, obligatorio: false},
    { id: 3, nombre: 'Oracle Database', proveedor: 'Oracle', estado: 'Deprecated', permitido: false, recomendado: false, obligatorio: false},
    { id: 4, nombre: 'MySQL', proveedor: 'Oracle', estado: 'Hold', permitido: false, recomendado: false, obligatorio: false},
    { id: 5, nombre: 'DynamoDB', proveedor: 'AWS', estado: 'Activa', permitido: false, recomendado: false, obligatorio: false},
    { id: 6, nombre: 'DB2', proveedor: 'IBM', estado: 'EOL', permitido: false, recomendado: false, obligatorio: false}
  ];

  cambios = [ // Array ejemplos de prueba historial de cambios
    { fecha: '11/04/2024', usuario: 'Admin', descripcion: 'AWS Aurora: Marcado como Recreación' },
    { fecha: '06/04/2024', usuario: 'Admin', descripcion: 'MySQL: Cambiado a estado Hold.' },
    { fecha: '02/04/2024', usuario: 'Admin', descripcion: 'DB2: Marcado como EOL' },
    { fecha: '20/03/2024', usuario: 'Admin', descripcion: 'PostgreSQL: Permitido y Obligatorio.' },
    { fecha: '15/03/2024', usuario: 'Admin', descripcion: 'Oracle: Marcado como Depreciated.' }
  ];

  desplegables = { // Mapa que guarda el estado de cada desplegable
    tipologia: false,
    plataforma: false,
    dominio: false
  };

  // Valores seleccionados en los filtros (NUEVO)
  filtros = {
    tipologia: 'Backend Spring Boot',
    plataforma: 'AWS',
    dominio: 'Base de Datos'
  };

  // Para el buscador (NUEVO)
  textoBusqueda: string = '';

  // Propiedades para el modal, para controlar si el modal está visible o no
  mostrarModal: boolean = false;
  techEnEdicion: any = null;

  // Getter para filtrar tecnologías (NUEVO)
  get tecnologiasFiltradas() {
    if (!this.textoBusqueda) return this.tecnologias;
    
    const busqueda = this.textoBusqueda.toLowerCase();
    return this.tecnologias.filter(tech => 
      tech.nombre.toLowerCase().includes(busqueda) ||
      tech.proveedor.toLowerCase().includes(busqueda)
    );
  }

  toggleDesplegable(seccion: 'tipologia' | 'plataforma' | 'dominio') { // Función para cambiar de estado con 3 parámetros que recibe del HTML
    this.desplegables[seccion] = !this.desplegables[seccion]; // Invierte la elección es decir que si tengo seleccionado uno, ese uno se vuelve true
                                                              // mientras que el resto se vuelve false
  }

  // NUEVO: Método para seleccionar una opción del desplegable
  seleccionarOpcion(seccion: 'tipologia' | 'plataforma' | 'dominio', valor: string) {
    this.filtros[seccion] = valor; // Actualiza el valor mostrado
    this.desplegables[seccion] = false; // Cierra el desplegable
  }

  // Métodos para el modal
  abrirModal(tech: any) { // Recibe un parámetro tech y este método se ejecutará cuando se haga click en el botón editar.
    this.techEnEdicion = { ...tech }; // Variable que pertenece a la clase (this), que crea una copia e indica la tecnología que se está editando ahora mismo.
                                    // el operador ...spread, lo que hace es que coge todas las propiedades de tech y las pone en un objeto nuevo, haciendo una copia.
                                    // Esto lo hago por si el usuario cancela la operación, así el original se mantiene.
    this.mostrarModal = true; // Lo hacemos visible
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.techEnEdicion = null; // Ponemos en null la variable que se ha usado (o no) antes
  }

  guardarModal() {
    // Aquí irá la llamada al backend
    console.log('Guardando:', this.techEnEdicion);
    
    // Actualizar en la tabla (temporal)
    const index = this.tecnologias.findIndex(t => t.id === this.techEnEdicion.id);
    if (index !== -1) {
      this.tecnologias[index] = { ...this.techEnEdicion };
    }
    
    this.cerrarModal();
  }
}