<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            // Queue email to avoid blocking the request
            Mail::to(config('mail.from.address'))
                ->queue(new ContactMail($validated));

            return back()->with('success', 'Message sent successfully! We\'ll get back to you soon.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to send message. Please try again later.');
        }
    }
}
