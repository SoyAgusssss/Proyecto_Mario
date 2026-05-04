<?php

namespace Tests\Unit;

use App\Models\Personaje;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PersonajeTest extends TestCase
{
    use RefreshDatabase;

    private function datosBase(): array
    {
        return [
            'nombre' => 'Wario',
            'tipo' => 'Enemigo',
            'poder' => 20,
            'mundo' => 'Agua',
        ];
    }

    public function test_creacion_de_personaje_en_modelo(): void
    {
        // Creacion de un Personaje en el modelo
        $personaje = Personaje::create($this->datosBase());

        $this->assertDatabaseHas('personajes', [
            'id' => $personaje->id,
            'nombre' => 'Wario',
            'tipo' => 'Enemigo',
            'poder' => 20,
            'mundo' => 'Agua',
        ]);
    }

    public function test_actualizacion_de_datos_en_modelo(): void
    {
        // Actualizacion de datos en el modelo
        $personaje = Personaje::create($this->datosBase());

        $personaje->update([
            'nombre' => 'Bowser',
            'tipo' => 'Jefe',
            'poder' => 99,
            'mundo' => 'Volcan',
        ]);

        $this->assertDatabaseHas('personajes', [
            'id' => $personaje->id,
            'nombre' => 'Bowser',
            'tipo' => 'Jefe',
            'poder' => 99,
            'mundo' => 'Volcan',
        ]);
    }

    public function test_eliminacion_de_registros_en_modelo(): void
    {
        // Eliminacion de registros en el modelo
        $personaje = Personaje::create($this->datosBase());

        $personaje->delete();

        $this->assertDatabaseMissing('personajes', [
            'id' => $personaje->id,
        ]);
    }
}
