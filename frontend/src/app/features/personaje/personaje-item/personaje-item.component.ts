import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Personaje, MarioService } from '../../../core/services/mario.service';


@Component({
  selector: 'app-personaje-item',
  templateUrl: './personaje-item.component.html',
  styleUrls: ['./personaje-item.component.css']
})
export class PersonajeItemComponent {


  @Input() personaje!: Personaje;
  @Output() delete = new EventEmitter<string>();

  constructor(private marioService: MarioService) {}


}
