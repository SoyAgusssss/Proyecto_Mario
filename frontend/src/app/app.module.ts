import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MarioDexPageComponent } from './features/personaje/mariodex-page/mariodex-page.component';
import { PersonajeItemComponent } from './features/personaje/personaje-item/personaje-item.component';
import { NuevoPersonajeComponent } from './features/personaje/nuevo-personaje/nuevo-personaje.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    MarioDexPageComponent,
    PersonajeItemComponent,
    NuevoPersonajeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

