<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MatchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:3,10')
    ->name('contact.store');

Route::get('/matches', [MatchController::class, 'index'])
->name('matches.index');

Route::get('/league', [MatchController::class, 'league'])
->name('matches.league');

Route::get('/login', [MatchController::class, 'login'])
->name('matches.login');
