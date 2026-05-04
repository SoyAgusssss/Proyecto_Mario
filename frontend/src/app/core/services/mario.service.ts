import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Personaje {
  id?: number;
  nombre: string;
  tipo: string;
  poder?: number;
  mundo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarioService {
  private apiUrl = 'https://proyecto-mario-backend-wsgk.onrender.com/api/personajes';
  private personajeSubject = new BehaviorSubject<Personaje[]>([]);
  personaje$ = this.personajeSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPersonajes();
  }

  loadPersonajes(): void {
    this.http.get<Personaje[]>(this.apiUrl).subscribe(
      data => this.personajeSubject.next(data),
      error => console.error('Error cargando personajes:', error)
    );
  }

  getPersonajes(): Observable<Personaje[]> {
    return this.personaje$;
  }

  getPersonajeList(): Personaje[] {
    return this.personajeSubject.value;
  }

  addPersonaje(personaje: Personaje): Observable<Personaje> {

    // Comportamiento ante datos incorrectos o vacios (alta invalida)
    if (!personaje?.nombre?.trim() || !personaje?.tipo?.trim()) {
      return throwError(() => new Error('Datos invalidos'));
    }

    const payload = {
      ...personaje,
      mundo: personaje.mundo?.trim() || 'Desconocido'
    };

    return this.http.post<Personaje>(this.apiUrl, payload).pipe(
      // Correcto funcionamiento al añadir un Personaje y reflejarlo en la lista local
      tap(newPersonaje => {
        const current = this.personajeSubject.value;
        this.personajeSubject.next([...current, newPersonaje]);
      })
    );
  }

  deletePersonaje(id: string): Observable<null> {
    // Validacion defensiva de ID para evitar peticiones invalidas
    if (!id?.trim()) {
      return throwError(() => new Error('ID invalido'));
    }

    return this.http.delete<null>(this.apiUrl + '/' + id).pipe(
      // Correcto funcionamiento al eliminar un Personaje y actualizar la lista local
      tap(() => {
        const current = this.personajeSubject.value;
        this.personajeSubject.next(current.filter(p => String(p.id) !== id));
      })
    );
  }
}

