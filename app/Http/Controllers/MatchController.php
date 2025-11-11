<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class MatchController extends Controller
{
    public function index(Request $request): Response
    {
        $date = $request->input('date', now()->toDateString());
        $competition = 'PD'; //HARD-CODED FOR NOW

        $response = Http::withHeaders([
            'X-Auth-Token' => env('FOOTBALL_DATA_API_KEY')
        ])->get("https://api.football-data.org/v4/competitions/{$competition}/matches", [
            'dateFrom' => $date,
            'dateTo' => $date
        ]);


        // Log the raw response from the API
        Log::info('Football API Response: ' . $response->body());

        return Inertia::render('Matches/Index', [
            'matches' => $response->json() ?? []
        ]);
    }

    public function league(Request $request): Response
    {
        $date = $request->input('date', now()->toDateString());
        $competition = $request->input('competition', 'PD');

        $response = Http::withHeaders([
            'X-Auth-Token' => env('FOOTBALL_DATA_API_KEY')
        ])->get("https://api.football-data.org/v4/competitions/{$competition}/matches", [
            'dateFrom' => $date,
            'dateTo' => $date
        ]);

        return Inertia::render('Matches/League', [
            'matches' => $response->json() ?? [],
            'selectedLeague' => $competition,
            'selectedDate' => $date,
        ]);
    }
}
