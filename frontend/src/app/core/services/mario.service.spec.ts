/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarioService, Personaje } from './mario.service';

describe('MarioService', () => {
  let service: MarioService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8000/api/personajes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(MarioService);
    httpMock = TestBed.inject(HttpTestingController);

    // El constructor llama a loadPersonajes(), así que vaciamos esa request inicial
    const initReq = httpMock.expectOne(apiUrl);
    expect(initReq.request.method).toBe('GET');
    initReq.flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Correcta creacion del servicio
  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  // Correcta obtencion de la lista de Personajes
  it('debe obtener la lista de personajes', () => {
    const mockList: Personaje[] = [
      { id: 1, nombre: 'Mario', tipo: 'Heroe', poder: 100, mundo: 'Plantas' },
      { id: 2, nombre: 'Bowser', tipo: 'Villano', poder: 120, mundo: 'Castillo' }
    ];

    service.loadPersonajes();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockList);

    expect(service.getPersonajeList()).toEqual(mockList);
  });

  // Correcto funcionamiento al añadir un Personaje
  it('debe añadir un personaje correctamente', () => {
    const nuevo: Personaje = { nombre: 'Luigi', tipo: 'Heroe', poder: 90 };
    const creado: Personaje = { id: 3, nombre: 'Luigi', tipo: 'Heroe', poder: 90, mundo: 'Desconocido' };

    service.addPersonaje(nuevo).subscribe((resp: Personaje) => {
      expect(resp).toEqual(creado);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ ...nuevo, mundo: 'Desconocido' });
    req.flush(creado);

    expect(service.getPersonajeList()).toEqual([creado]);
  });

  // Correcto funcionamiento al eliminar un Personaje
  it('debe eliminar un personaje correctamente', () => {
    const iniciales: Personaje[] = [
      { id: 1, nombre: 'Mario', tipo: 'Heroe', poder: 100, mundo: 'Plantas' },
      { id: 2, nombre: 'Bowser', tipo: 'Villano', poder: 120, mundo: 'Castillo' }
    ];

    (service as any).personajeSubject.next(iniciales);

    service.deletePersonaje('1').subscribe((resp: null) => {
      expect(resp).toBeNull();
    });

    const req = httpMock.expectOne(apiUrl + '/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(service.getPersonajeList()).toEqual([
      { id: 2, nombre: 'Bowser', tipo: 'Villano', poder: 120, mundo: 'Castillo' }
    ]);
  });

  // Correcto comportamiento ante datos incorrectos (error de backend al cargar)
  it('debe manejar carga con error y mantener lista vacia', () => {
    spyOn(console, 'error');

    service.loadPersonajes();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(
      { mensaje: 'error' },
      { status: 500, statusText: 'Server Error' }
    );

    expect(console.error).toHaveBeenCalled();
    expect(service.getPersonajeList()).toEqual([]);
  });

  // Comportamiento ante datos vacios (alta invalida)
  it('debe rechazar alta con datos vacios', () => {
    let capturedError: unknown = null;

    service.addPersonaje({ nombre: '   ', tipo: '', poder: 0 }).subscribe({
      next: () => fail('No deberia pasar por next'),
      error: (err: unknown) => {
        capturedError = err;
      }
    });

    
    httpMock.expectNone(apiUrl);
    expect(capturedError).toBeTruthy();
    expect((capturedError as Error).message).toContain('Datos invalidos');
  });
});
