import { Component, Output, EventEmitter } from '@angular/core';
import { MarioService } from '../../../core/services/mario.service';


@Component({
  selector: 'app-nuevo-personaje',
  templateUrl: './nuevo-personaje.component.html',
  styleUrls: ['./nuevo-personaje.component.css']
})
export class NuevoPersonajeComponent {


  @Output() close = new EventEmitter<void>();


  nombre = '';
  tipo = '';
  poder = 0;


  constructor(private marioService: MarioService) {}


  submit(): void {
    const nuevoPersonaje = {
      nombre: this.nombre,
      tipo: this.tipo,
      poder: this.poder,
    };

    this.marioService.addPersonaje(nuevoPersonaje).subscribe(
      () => {
        this.close.emit();
      },
      error => console.error('Error al agregar personaje:', error)
    );
  }


  cancel(): void {
    this.close.emit();
  }
}