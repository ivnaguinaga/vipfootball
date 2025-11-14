#!/bin/bash

# Run migrations
php artisan migrate --force

# Start server
php artisan serve --host=0.0.0.0 --port=$PORT
