<?php

use App\Http\Controllers\MatchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/matches', [MatchController::class, 'index'])
->name('matches.index');

Route::get('/league', [MatchController::class, 'league'])
->name('matches.league');

Route::get('/login', [MatchController::class, 'login'])
->name('matches.login');
