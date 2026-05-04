import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MarioDexPageComponent } from './mariodex-page.component';
import { MarioService, Personaje } from '../../../core/services/mario.service';

describe('MarioDexPageComponent', () => {
  let component: MarioDexPageComponent;
  let fixture: ComponentFixture<MarioDexPageComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarioDexPageComponent ],
      imports: [HttpClientTestingModule],
      providers: [MarioService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MarioDexPageComponent);
    component = fixture.componentInstance;

    // Ignorar la llamada inicial del servicio en el constructor
    const req = httpMock.expectOne('http://localhost:8000/api/personajes');
    req.flush([]);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe recibir datos del servicio y mostrar personajes', () => {
    // Datos mock para simular respuesta del backend
    const mockPersonajes: Personaje[] = [
      { id: 1, nombre: 'Mario', tipo: 'Heroe', poder: 100, mundo: 'Plantas' },
      { id: 2, nombre: 'Bowser', tipo: 'Villano', poder: 120, mundo: 'Castillo' }
    ];

    // Cargar nuevos personajes
    const service = TestBed.inject(MarioService);
    service.loadPersonajes();

    // Simular respuesta del backend
    const req = httpMock.expectOne('http://localhost:8000/api/personajes');
    expect(req.request.method).toBe('GET');
    req.flush(mockPersonajes);

    fixture.detectChanges();

    // Verificar que el componente recibió los datos
    expect(component.personajes).toEqual(mockPersonajes);
    expect(component.personajes.length).toBe(2);
    expect(component.personajes[0].nombre).toBe('Mario');
  });

  it('debe abrir y cerrar el modal correctamente', () => {
    expect(component.showModal).toBeFalse();

    component.openModal();
    expect(component.showModal).toBeTrue();

    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
});
