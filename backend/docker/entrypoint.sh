#!/bin/sh
set -e

mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

if [ "$1" = "frankenphp" ]; then
    php artisan schedule:work >/proc/1/fd/1 2>/proc/1/fd/2 &
fi

exec "$@"
