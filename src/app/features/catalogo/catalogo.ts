import '@angular/compiler';
import { Component } from '@angular/core'; // Importa herraminetas de Angular

// Lógica del catálogo0

@Component({ // Anotación que hace de etiqueta que dice que es un componente
  selector: 'app-catalogo', // Nombre HTML para usar este componente (como un ID del componente)
  standalone: true, // El componente funciona por sí mismo, no necesita un padre para funcionar
  imports: [],
  templateUrl: './catalogo.html', //Qué HTML usa
  styleUrl: './catalogo.css' // Que CSS
})

export class CatalogoComponent {
  tecnologias = [
    { 
      nombre: 'PostgreSQL', 
      proveedor: 'Open Source', 
      estado: 'Activa',
      permitido:  false,
      recomendado: false,
      obligatorio: false
    },
    { 
      nombre: 'Amazon Aurora', 
      proveedor: 'AWS', 
      estado: 'Activa',
      permitido: false,
      recomendado: false,
      obligatorio: false
    },
    { 
      nombre: 'Oracle Database', 
      proveedor: 'Oracle', 
      estado: 'Deprecated',
      permitido: false,
      recomendado: false,
      obligatorio: false
    },
    { 
      nombre: 'MySQL', 
      proveedor: 'Oracle', 
      estado: 'Hold',
      permitido: false,
      recomendado: false,
      obligatorio: false
    },
    { 
      nombre: 'DynamoDB', 
      proveedor: 'AWS', 
      estado: 'Activa',
      permitido: false,
      recomendado: false,
      obligatorio: false
    },
    { 
      nombre: 'DB2', 
      proveedor: 'IBM', 
      estado: 'EOL',
      permitido: false,
      recomendado: false,
      obligatorio: false
    }
  ];

  cambios = [
    { fecha: '11/04/2024', usuario: 'Admin', descripcion: 'AWS Aurora: Marcado como Recreación' },
    { fecha: '06/04/2024', usuario: 'Admin', descripcion: 'MySQL: Cambiado a estado Hold.' },
    { fecha: '02/04/2024', usuario: 'Admin', descripcion: 'DB2: Marcado como EOL' },
    { fecha: '20/03/2024', usuario: 'Admin', descripcion: 'PostgreSQL: Permitido y Obligatorio.' },
    { fecha: '15/03/2024', usuario: 'Admin', descripcion: 'Oracle: Marcado como Depreciated.' }
  ];

  desplegables = {
    tipologia: false,
    plataforma: false,
    dominio: false
  };

  toggleDesplegable(seccion: 'tipologia' | 'plataforma' | 'dominio') {
    this.desplegables[seccion] = !this.desplegables[seccion];
  }
}