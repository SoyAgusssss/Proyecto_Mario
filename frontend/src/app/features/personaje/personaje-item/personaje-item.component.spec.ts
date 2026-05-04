import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PersonajeItemComponent } from './personaje-item.component';

describe('PersonajeItemComponent', () => {
  let component: PersonajeItemComponent;
  let fixture: ComponentFixture<PersonajeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonajeItemComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonajeItemComponent);
    component = fixture.componentInstance;
    component.personaje = {
      id: 1,
      nombre: 'Mario',
      tipo: 'Heroe',
      poder: 100,
      mundo: 'Plantas'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
