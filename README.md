# crypto-hub

## Installation 1/2
```
git clone git@github.com:npldevfr/crypto-hub.git
```

## Installation 2/2
```
cd ./api && cp .env.example .env && cd ..

pnpm install
```

## Run
```
// API
cd ./api && node ace serve --watch

// Nuxt
cd ./front && pnpm dev
```

## Docker (Database)
```
docker-compose up -d
```


[//]: # (### Docker 2/2)

[//]: # (```)

[//]: # (cd ./api && cp .env.example .env && cd ..)

[//]: # (```)

[//]: # ()
[//]: # (```)

[//]: # (docker-compose build)

[//]: # (```)

[//]: # ()
[//]: # (```)

[//]: # (docker-compose run --rm api pnpm i)

[//]: # (docker-compose run --rm nuxt pnpm i)

[//]: # (```)

[//]: # ()
[//]: # (```)

[//]: # (docker-compose up -d)

[//]: # (```)
