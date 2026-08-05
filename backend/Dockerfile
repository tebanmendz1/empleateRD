FROM dunglas/frankenphp:1-php8.4-alpine AS base

RUN install-php-extensions intl opcache pcntl pdo_pgsql redis zip

WORKDIR /app

FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json ./
COPY app ./app
COPY bootstrap ./bootstrap
COPY config ./config
COPY database ./database
COPY public ./public
COPY resources ./resources
COPY routes ./routes
COPY storage ./storage
COPY artisan ./artisan
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

FROM base AS production
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV SERVER_NAME=:8000

COPY --from=vendor /app /app
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY docker/entrypoint.sh /usr/local/bin/empleaterd-entrypoint

RUN chmod +x /usr/local/bin/empleaterd-entrypoint \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8000/up > /dev/null || exit 1

ENTRYPOINT ["empleaterd-entrypoint"]
CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]
