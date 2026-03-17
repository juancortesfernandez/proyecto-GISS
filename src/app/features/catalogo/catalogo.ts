import '@angular/compiler'; // Carga el compilador de Angular
import { Component } from '@angular/core'; // Importa herraminetas de Angular para crear componentes

// Lógica del catálogo0

@Component({ // Anotación que hace de etiqueta que dice que es un componente
  selector: 'app-catalogo', // Nombre HTML para usar este componente (como un ID del componente), así lo podré llamar desde otrors HTML
  standalone: true, // El componente funciona por sí mismo, no necesita un padre para funcionar
  imports: [], // Esto sería para importar otros componentes, en este caso, de momento, no uso ninguno
  templateUrl: './catalogo.html', //Ruta del HTML que usa
  styleUrl: './catalogo.css' // Ruta del CSS que usa
})

export class CatalogoComponent { // Este componente está disponible para que otros lo usen

  tecnologias = [ // Array con tecnologías de prueba

    { nombre: 'PostgreSQL', proveedor: 'Open Source', estado: 'Activa', permitido:  false, recomendado: false, obligatorio: false},
    { nombre: 'Amazon Aurora', proveedor: 'AWS', estado: 'Activa', permitido: false, recomendado: false, obligatorio: false},
    { nombre: 'Oracle Database', proveedor: 'Oracle', estado: 'Deprecated', permitido: false, recomendado: false, obligatorio: false},
    { nombre: 'MySQL', proveedor: 'Oracle', estado: 'Hold', permitido: false, recomendado: false, obligatorio: false},
    { nombre: 'DynamoDB', proveedor: 'AWS', estado: 'Activa', permitido: false, recomendado: false, obligatorio: false},
    { nombre: 'DB2', proveedor: 'IBM', estado: 'EOL', permitido: false, recomendado: false, obligatorio: false}

  ];

  cambios = [ // Array ejemplos de prueba historial de cambios

    { fecha: '11/04/2024', usuario: 'Admin', descripcion: 'AWS Aurora: Marcado como Recreación' },
    { fecha: '06/04/2024', usuario: 'Admin', descripcion: 'MySQL: Cambiado a estado Hold.' },
    { fecha: '02/04/2024', usuario: 'Admin', descripcion: 'DB2: Marcado como EOL' },
    { fecha: '20/03/2024', usuario: 'Admin', descripcion: 'PostgreSQL: Permitido y Obligatorio.' },
    { fecha: '15/03/2024', usuario: 'Admin', descripcion: 'Oracle: Marcado como Depreciated.' }

  ];

  desplegables = { // Mapaque guarda el estado de cada desplegable
    tipologia: false,
    plataforma: false,
    dominio: false
  };

  toggleDesplegable(seccion: 'tipologia' | 'plataforma' | 'dominio') { // Función para cambiar de estado  con 3 parámetros que recibe del HTML
    this.desplegables[seccion] = !this.desplegables[seccion]; // Invierte la elección es decir que si tengo seleccionado uno, ese uno se vuelve true
                                                              // mientras que el resto se vuelve false
  }

}