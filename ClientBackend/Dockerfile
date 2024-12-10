FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .
RUN composer install --no-dev --optimize-autoloader

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
