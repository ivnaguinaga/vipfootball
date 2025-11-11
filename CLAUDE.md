# CLAUDE.md

In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.

## Project Overview

VipFootball is a Laravel 12 + React (Inertia.js) application for displaying football match data. The backend is PHP-based (Laravel framework), and the frontend uses React 19 with TypeScript, Tailwind CSS v4, and Inertia.js for seamless SPA navigation.

## Development Commands

### Starting the Development Environment

```bash
# Start all services (Laravel server, queue, logs, Vite) concurrently
composer dev
```

This command starts:
- PHP development server (port 8000)
- Queue listener
- Laravel Pail logs
- Vite dev server for hot module replacement

### Frontend Development

```bash
npm run dev           # Start Vite dev server only
npm run build         # Build for production
npm run build:ssr     # Build with SSR support
npm run lint          # Run ESLint with auto-fix
npm run types         # Type-check TypeScript without emitting
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without modifying files
```

### Backend Development

```bash
php artisan serve              # Start Laravel dev server only
php artisan test               # Run all tests
composer test                  # Run tests (clears config first)
php artisan migrate            # Run migrations
php artisan tinker             # Interactive REPL
php artisan pail              # Tail application logs
vendor/bin/pest               # Run Pest tests directly
vendor/bin/pest --filter=TestName  # Run specific test
```

### Code Quality

```bash
./vendor/bin/pint              # Format PHP code (Laravel Pint)
```

## Architecture

### Full-Stack Integration

This is a **Laravel + Inertia.js + React** application where:
- Laravel serves as the backend API and routing layer
- Inertia.js acts as a bridge, eliminating the need for a separate REST/GraphQL API
- React components receive props directly from Laravel controllers via Inertia

### Wayfinder Route System

The project uses **Laravel Wayfinder** for type-safe routing between backend and frontend:
- PHP routes defined in `routes/web.php` are automatically synced to TypeScript
- Generated route helpers live in `resources/js/actions/App/Http/Controllers/`
- Import and use routes like: `import { index } from '@/actions/App/Http/Controllers/MatchController'`
- Routes provide type-safe URL generation with query parameters
- Vite plugin (`@laravel/vite-plugin-wayfinder`) generates routes on file changes

**Important**: After adding/modifying routes in `routes/web.php`, the Wayfinder TypeScript files are auto-generated. Always use the generated route functions instead of hardcoding URLs.

### Directory Structure

**Backend (Laravel)**
- `app/Http/Controllers/` - Laravel controllers (return Inertia responses)
- `app/Models/` - Eloquent models
- `routes/web.php` - Route definitions
- `database/migrations/` - Database migrations
- `tests/` - Pest PHP tests

**Frontend (React + TypeScript)**
- `resources/js/pages/` - Inertia page components (automatically discovered by path)
- `resources/js/components/ui/` - Shadcn UI components
- `resources/js/actions/` - Auto-generated Wayfinder route helpers
- `resources/js/wayfinder/` - Wayfinder utility functions
- `resources/js/app.tsx` - Main Inertia app entry point
- `resources/js/ssr.tsx` - SSR entry point
- `resources/css/app.css` - Global styles with Tailwind directives

### Key Patterns

**Inertia Page Components**: Located in `resources/js/pages/`. They receive props from Laravel controllers and are resolved automatically. Example:
```typescript
// routes/web.php defines: Route::get('/matches', [MatchController::class, 'index'])
// Maps to: resources/js/pages/Matches/Index.tsx
```

**Controller → Inertia → React Flow**:
1. Laravel controller returns `Inertia::render('PageName', ['prop' => $data])`
2. Inertia serializes data and sends to frontend
3. React component receives data as typed props
4. No separate API endpoints needed

**External API Integration**: The app fetches data from football-data.org API. API key is stored in `.env` as `FOOTBALL_DATA_API_KEY`.

## Tech Stack

**Backend**
- PHP 8.2+
- Laravel 12
- Inertia Laravel adapter
- SQLite database (default)
- Pest for testing

**Frontend**
- React 19
- TypeScript 5.7
- Inertia.js React adapter
- Tailwind CSS v4
- Vite 7
- Shadcn UI components (New York style)
- Lucide React icons

## Configuration Notes

- **TypeScript paths**: Configured in `tsconfig.json` with `@/` alias pointing to `resources/js/`
- **Shadcn UI**: Configured in `components.json` with New York style, CSS variables enabled
- **ESLint**: Uses flat config format (`eslint.config.js`) with React and TypeScript rules
- **Testing**: Pest is the test framework; PHPUnit XML configuration in `phpunit.xml`
- **Database**: Default is SQLite (`database/database.sqlite`); migrations run automatically on fresh install

## Development Workflow

1. **Adding a new route**:
   - Define route in `routes/web.php`
   - Create controller method that returns `Inertia::render()`
   - Create corresponding React component in `resources/js/pages/`
   - Use auto-generated Wayfinder route helper from `resources/js/actions/`

2. **Adding UI components**:
   - Shadcn components go in `resources/js/components/ui/`
   - Follow the established pattern (see `button.tsx`, `switch.tsx`)
   - Import utilities from `@/lib/utils`

3. **Working with the Football Data API**:
   - API calls are made server-side in Laravel controllers
   - Set `FOOTBALL_DATA_API_KEY` in `.env`
   - Example: See `MatchController.php` for API integration pattern
