import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {

  tecnologias: any[] = [];

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

  filtros = {
    tipologia: 'Backend Spring Boot',
    plataforma: 'Amazon Web Services',
    dominio: 'Base de Datos'
  };

  textoBusqueda: string = '';

  // Propiedades para el modal
  mostrarModal: boolean = false;
  techEnEdicion: any = null;
  modoTitulo: string = 'Editar Tecnología';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarTecnologias();
  }

  cargarTecnologias() {
    console.log('🔄 Cargando tecnologías desde backend...');
    this.apiService.getTechnologies().subscribe({
      next: (data) => {
        console.log('✅ Tecnologías cargadas:', data);
        this.tecnologias = data;
      },
      error: (error) => {
        console.error('❌ Error al cargar tecnologías:', error);
      }
    });
  }

  get tecnologiasFiltradas() {
    if (!this.textoBusqueda) return this.tecnologias;

    const busqueda = this.textoBusqueda.toLowerCase();
    return this.tecnologias.filter(tech =>
      tech.nombre?.toLowerCase().includes(busqueda) ||
      tech.proveedor?.toLowerCase().includes(busqueda)
    );
  }

  toggleDesplegable(seccion: 'tipologia' | 'plataforma' | 'dominio') {
    this.desplegables[seccion] = !this.desplegables[seccion];
  }

  seleccionarOpcion(seccion: 'tipologia' | 'plataforma' | 'dominio', valor: string) {
    this.filtros[seccion] = valor;
    this.desplegables[seccion] = false;
  }

  abrirModal(tech: any) {
    this.techEnEdicion = { ...tech };
    this.mostrarModal = true;
    this.modoTitulo = 'Editar Tecnología';
  }

 abrirModalNuevo() {
  this.techEnEdicion = {
    id: null,
    nombre: '',
    proveedor: '',
    version: '',
    lifeCycleStatus: 'ACTIVE',
    active: true,
    domain: { id: 1 }  // ← DOMINIO POR DEFECTO (Backend)
  };
  this.mostrarModal = true;
  this.modoTitulo = 'Añadir Nueva Tecnología';
}

  cerrarModal() {
    this.mostrarModal = false;
    this.techEnEdicion = null;
  }

  guardarModal() {
  if (this.modoTitulo === 'Añadir Nueva Tecnología') {
    // Crear el objeto con todos los campos requeridos
    const nuevaTech = {
      code: this.techEnEdicion.nombre?.toUpperCase().replace(/\s/g, '_') || 'TECH_' + Date.now(),
      name: this.techEnEdicion.nombre,
      supplier: this.techEnEdicion.proveedor,
      version: this.techEnEdicion.version || '1.0',
      domain: { id: this.techEnEdicion.domain?.id || 1 },
      lifeCycleStatus: this.techEnEdicion.lifeCycleStatus || 'ACTIVE',
      active: this.techEnEdicion.active !== undefined ? this.techEnEdicion.active : true
    };
    
    console.log('📤 Enviando al backend:', JSON.stringify(nuevaTech, null, 2));
    
    this.apiService.createTechnology(nuevaTech).subscribe({
      next: (techCreada) => {
        console.log('✅ Tecnología creada:', techCreada);
        this.cargarTecnologias();
        this.cerrarModal();
      },
      error: (error) => {
        console.error('❌ Error al crear tecnología:', error);
        // Mostrar el error detallado
        if (error.error) {
          console.error('Detalle del error:', error.error);
          alert('Error: ' + (error.error.message || JSON.stringify(error.error)));
        } else {
          alert('Error al guardar. Revisa la consola.');
        }
      }
    });
  } else {
    // EDITAR TECNOLOGÍA EXISTENTE
    const techActualizada = {
      id: this.techEnEdicion.id,
      code: this.techEnEdicion.code || this.techEnEdicion.nombre?.toUpperCase().replace(/\s/g, '_'),
      name: this.techEnEdicion.nombre,
      supplier: this.techEnEdicion.proveedor,
      version: this.techEnEdicion.version,
      domain: { id: this.techEnEdicion.domain?.id || 1 },
      lifeCycleStatus: this.techEnEdicion.lifeCycleStatus,
      active: this.techEnEdicion.active
    };
    
    this.apiService.updateTechnology(this.techEnEdicion.id, techActualizada).subscribe({
      next: (techActualizadaResp) => {
        console.log('✅ Tecnología actualizada:', techActualizadaResp);
        this.cargarTecnologias();
        this.cerrarModal();
      },
      error: (error) => {
        console.error('❌ Error al actualizar tecnología:', error);
        alert('Error al actualizar: ' + (error.error?.message || error.message));
      }
    });
  }
}

  eliminarTecnologia(id: number) {
    if (confirm('¿Estás seguro de eliminar esta tecnología?')) {
      this.apiService.deleteTechnology(id).subscribe({
        next: () => {
          console.log('✅ Tecnología eliminada');
          this.cargarTecnologias();  // Recargar lista
        },
        error: (error) => {
          console.error('❌ Error al eliminar tecnología:', error);
          alert('Error al eliminar: ' + (error.error?.message || error.message));
        }
      });
    }
  }
}