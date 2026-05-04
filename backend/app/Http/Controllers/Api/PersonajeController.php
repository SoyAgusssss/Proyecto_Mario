<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Personaje;
use Illuminate\Http\Request;

class PersonajeController extends Controller
{
    public function index()
    {
        return Personaje::all();
    }

    public function store(Request $request)
    {
        // Validacion de datos para creacion de Personaje
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'tipo' => ['required', 'string', 'max:255'],
            'poder' => ['required', 'integer', 'min:0'],
            'mundo' => ['required', 'string', 'max:255'],
        ]);

        return response()->json(Personaje::create($validated), 201);
    }

    public function update(Request $request, Personaje $personaje)
    {
        // Validacion de datos para actualizacion de Personaje
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'tipo' => ['required', 'string', 'max:255'],
            'poder' => ['required', 'integer', 'min:0'],
            'mundo' => ['required', 'string', 'max:255'],
        ]);

        $personaje->update($validated);

        return response()->json($personaje);
    }

    public function destroy(Personaje $personaje)
    {
        $personaje->delete();

        return response()->noContent();
    }

}

