<?php

namespace Tests\Feature;

use App\Models\Personaje;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PersonajeControllerTest extends TestCase
{
    use RefreshDatabase;

    private function payload(): array
    {
        return [
            'nombre' => 'Mario',
            'tipo' => 'Heroe',
            'poder' => 10,
            'mundo' => 'Plantas',
        ];
    }

    public function test_creacion_de_personaje_desde_controlador(): void
    {
        // Creacion de un Personaje desde el controlador
        $response = $this->postJson('/api/personajes', $this->payload());

        $response->assertCreated()
            ->assertJsonFragment([
                'nombre' => 'Mario',
                'tipo' => 'Heroe',
                'poder' => 10,
                'mundo' => 'Plantas',
            ]);

        $this->assertDatabaseHas('personajes', [
            'nombre' => 'Mario',
            'tipo' => 'Heroe',
            'poder' => 10,
            'mundo' => 'Plantas',
        ]);
    }

    public function test_actualizacion_de_datos_desde_controlador(): void
    {
        // Actualizacion de datos desde el controlador
        $personaje = Personaje::create($this->payload());

        $response = $this->putJson("/api/personajes/{$personaje->id}", [
            'nombre' => 'Luigi',
            'tipo' => 'Heroe',
            'poder' => 30,
            'mundo' => 'Castillo',
        ]);

        $response->assertOk()
            ->assertJsonFragment([
                'id' => $personaje->id,
                'nombre' => 'Luigi',
                'poder' => 30,
                'mundo' => 'Castillo',
            ]);

        $this->assertDatabaseHas('personajes', [
            'id' => $personaje->id,
            'nombre' => 'Luigi',
            'poder' => 30,
            'mundo' => 'Castillo',
        ]);
    }

    public function test_eliminacion_de_registros_desde_controlador(): void
    {
        // Eliminacion de registros desde el controlador
        $personaje = Personaje::create($this->payload());

        $response = $this->deleteJson("/api/personajes/{$personaje->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('personajes', [
            'id' => $personaje->id,
        ]);
    }

    public function test_validacion_de_datos_en_controlador(): void
    {
        // Validacion de datos en el controlador
        $response = $this->postJson('/api/personajes', [
            'nombre' => '',
            'tipo' => '',
            'poder' => 'no-es-numero',
            'mundo' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['nombre', 'tipo', 'poder', 'mundo']);
    }

    public function test_obtener_lista_de_personajes(): void
    {
        // Prueba simple: GET /api/personajes debe retornar lista de personajes
        Personaje::create($this->payload());
        Personaje::create([
            'nombre' => 'Bowser',
            'tipo' => 'Villano',
            'poder' => 15,
            'mundo' => 'Castillo',
        ]);

        $response = $this->getJson('/api/personajes');

        // Verificar codigo de estado 200
        $response->assertOk();

        // Verificar estructura JSON
        $response->assertJsonCount(2);
        $response->assertJsonStructure([
            '*' => ['id', 'nombre', 'tipo', 'poder', 'mundo', 'created_at', 'updated_at']
        ]);

        // Verificar contenido
        $response->assertJsonFragment(['nombre' => 'Mario'])
            ->assertJsonFragment(['nombre' => 'Bowser']);
    }
}
