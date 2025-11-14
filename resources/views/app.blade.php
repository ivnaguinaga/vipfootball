<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <script>
          const theme = localStorage.getItem("theme");
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        </script>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="theme-color" content="#1f2937">

        <title inertia>{{ config('app.name', 'VipFootball') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen" style="padding-bottom: env(safe-area-inset-bottom);">

        <header class="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700 shadow-xl" style="padding-top: env(safe-area-inset-top);">
            <div class="max-w-full px-4 md:px-6" style="padding-left: max(1rem, env(safe-area-inset-left)); padding-right: max(1rem, env(safe-area-inset-right));">
                <div class="flex items-center justify-between h-16 md:h-20">
                    <!-- Logo - Left -->
                    <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="64" viewBox="0 0 220 64" role="img" aria-label="VipFootball logo" class="h-10 md:h-16">
                          <defs>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                            </linearGradient>
                            <style>
                              .title { font-family: 'Instrument Sans', Arial, sans-serif; font-weight: 700; font-size: 26px; fill: #ffffff; letter-spacing: -0.5px; }
                              .vip { font-family: 'Instrument Sans', Arial, sans-serif; font-weight: 800; font-size: 26px; fill: url(#greenGradient); letter-spacing: -0.5px; }
                              .ball-outline { fill: none; stroke: #10b981; stroke-width: 3px; }
                              .ball-fill { fill: #10b981; opacity: 0.2; }
                              .star { fill: #10b981; }
                            </style>
                          </defs>

                          <!-- Football with star -->
                          <g transform="translate(24,32)">
                            <circle cx="0" cy="0" r="16" class="ball-fill" />
                            <circle cx="0" cy="0" r="16" class="ball-outline" />
                            <path d="M0,-8 L2,-2 L8,-2 L3,2 L5,8 L0,4 L-5,8 L-3,2 L-8,-2 L-2,-2 Z" class="star" />
                          </g>

                          <!-- Text -->
                          <text x="52" y="40" class="vip">Vip</text>
                          <text x="90" y="40" class="title">Football</text>
                        </svg>
                    </a>

                    <!-- Desktop Navigation - Center -->
                    <nav class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2">
                        <a href="/" class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all font-medium">
                            Home
                        </a>
                        {{-- <a href="/matches" class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all font-medium">
                            Matches
                        </a> --}}
                        <a href="/league" class="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-all font-semibold shadow-lg shadow-emerald-600/30">
                            Leagues
                        </a>
                    </nav>

                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-button" class="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <!-- Desktop Contact Button - Right -->
                    <a href="/contact" class="hidden md:block px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg transition-all font-semibold shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 transform">
                        Contact Me
                    </a>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden md:hidden pb-4 pt-2">
                    <nav class="flex flex-col gap-2">
                        <a href="/" class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all font-medium">
                            Home
                        </a>
                        {{-- <a href="/matches" class="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all font-medium">
                            Matches
                        </a> --}}
                        <a href="/league" class="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-all font-semibold shadow-lg shadow-emerald-600/30">
                            Leagues
                        </a>
                        <a href="/contact" class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg transition-all font-semibold shadow-lg shadow-emerald-600/30">
                            Contact Me
                        </a>
                    </nav>
                </div>
            </div>
        </header>

        <script>
            // Mobile menu toggle
            document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
                const menu = document.getElementById('mobile-menu');
                if (menu) {
                    menu.classList.toggle('hidden');
                }
            });
        </script>

        <div class="pt-16 md:pt-20">
            @inertia
        </div>
    </body>

</html>
