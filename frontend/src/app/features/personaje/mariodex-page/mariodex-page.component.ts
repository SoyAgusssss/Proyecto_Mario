import { Component, OnInit } from '@angular/core';
import { Personaje, MarioService } from '../../../core/services/mario.service';


@Component({
  selector: 'app-mariodex',
  templateUrl: './mariodex-page.component.html',
  styleUrls: ['./mariodex-page.component.css']
})
export class MarioDexPageComponent implements OnInit {


  personajes: Personaje[] = [];
  showModal = false;


  constructor(private marioService: MarioService) {}


  ngOnInit(): void {
    this.marioService.personaje$.subscribe(data => {
      this.personajes = data;
    });
  }


  openModal(): void {
    this.showModal = true;
  }


  closeModal(): void {
    this.showModal = false;
  }

}