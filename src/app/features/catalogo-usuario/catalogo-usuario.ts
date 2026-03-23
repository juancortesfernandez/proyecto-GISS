import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-catalogo-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo-usuario.html',
  styleUrl: './catalogo-usuario.css'
})
export class CatalogoUsuarioComponent implements OnInit {
  
  tecnologias: any[] = [];
  
  // Valores seleccionados en los filtros
  filtros = {
    tipologia: 'Backend Spring Boot',
    plataforma: 'Amazon Web Services',
    dominio: 'Base de Datos'
  };

  // Control de apertura/cierre de desplegables
  desplegables = {
    tipologia: false,
    plataforma: false,
    dominio: false
  };

  textoBusqueda: string = '';
  techSeleccionada: any = null;

  constructor(private apiService: ApiService) {
    console.log('🏗️ Constructor de CatalogoUsuarioComponent ejecutado');
  }

  ngOnInit() {
    console.log('🔵 ngOnInit ejecutado');
    this.cargarTecnologias();
  }

  cargarTecnologias() {
    console.log('🔄 cargarTecnologias() ejecutado');
    console.log('Filtros:', this.filtros);
    
    this.apiService.getTechnologiesWithRules(
      this.filtros.tipologia,
      this.filtros.plataforma,
      this.filtros.dominio
    ).subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos del backend:', data);
        
        // Mapear los datos al formato que espera el HTML
        this.tecnologias = data.map(item => ({
          id: item.id,
          nombre: item.technology || item.nombre || item.name || 'Sin nombre',
          proveedor: item.supplier || item.proveedor || 'Desconocido',
          estado: item.lifeCycleStatus || item.estado || 'Activa',
          permitido: item.allowed === true,
          recomendado: item.recommended === true,
          obligatorio: item.mandatory === true
        }));
        
        console.log('📊 Tecnologías mapeadas:', this.tecnologias);
      },
      error: (error) => {
        console.error('❌ Error al cargar tecnologías:', error);
        // Si hay error, usar datos de prueba
        this.tecnologias = [
          { id: 1, nombre: 'PostgreSQL', proveedor: 'Open Source', estado: 'Activa', permitido: true, recomendado: true, obligatorio: false },
          { id: 2, nombre: 'Amazon Aurora', proveedor: 'AWS', estado: 'Activa', permitido: true, recomendado: true, obligatorio: true }
        ];
      }
    });
  }

  // Alternar apertura/cierre de desplegables
  toggleDesplegable(seccion: 'tipologia' | 'plataforma' | 'dominio') {
    this.desplegables[seccion] = !this.desplegables[seccion];
  }

  // Seleccionar una opción del desplegable
  seleccionarOpcion(seccion: 'tipologia' | 'plataforma' | 'dominio', valor: string) {
    this.filtros[seccion] = valor;
    this.desplegables[seccion] = false;
    this.cargarTecnologias();
  }

  // Filtro de búsqueda
  get tecnologiasFiltradas() {
    if (!this.textoBusqueda) return this.tecnologias;
    
    const busqueda = this.textoBusqueda.toLowerCase();
    return this.tecnologias.filter(tech => {
      const nombre = (tech.nombre || '').toLowerCase();
      const proveedor = (tech.proveedor || '').toLowerCase();
      return nombre.includes(busqueda) || proveedor.includes(busqueda);
    });
  }

  verDetalles(tech: any) {
    this.techSeleccionada = tech;
  }

  cerrarDetalles() {
    this.techSeleccionada = null;
  }
}