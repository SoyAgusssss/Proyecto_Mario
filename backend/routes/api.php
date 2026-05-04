<?php

use App\Http\Controllers\Api\PersonajeController;
use Illuminate\Support\Facades\Route;

Route::get('/personajes', [PersonajeController::class, 'index']);
Route::post('/personajes', [PersonajeController::class, 'store']);
Route::put('/personajes/{personaje}', [PersonajeController::class, 'update']);
Route::delete('/personajes/{personaje}', [PersonajeController::class, 'destroy']);
