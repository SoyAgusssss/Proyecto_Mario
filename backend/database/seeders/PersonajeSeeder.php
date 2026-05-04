<?php

namespace Database\Seeders;

use App\Models\Personaje;
use Illuminate\Database\Seeder;

class PersonajeSeeder extends Seeder
{
    public function run(): void
    {
        Personaje::create(['nombre' => 'Mario', 'tipo' => 'Héroe', 'poder' => 10, "mundo" => "Plantas"]);
        Personaje::create(['nombre' => 'Wario', 'tipo' => 'Enemigo', 'poder' => 20, "mundo" => "Agua"]);
        Personaje::create(['nombre' => 'Princesa', 'tipo' => 'Princesa', 'poder' => 30, "mundo" => "Mundo lava"]);
    }
}