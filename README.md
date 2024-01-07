# crypto-hub

## Installation 1/3
```
git clone https://github.com/EpitechMscProPromo2025/T-WEB-700-NAN_3
```

## Docker 2/3
```
docker-compose up -d
```

## Installation 3/3
```
cd ./api && cp .env.example .env && cd ..

// in the root folder
pnpm install

// in /api folder
node ace migration:fresh --seed
node ace rss:feed
```

## Run
```
// in the root folder
pnpm start:all

or 

// API
cd ./api && node ace serve --watch

// Nuxt
cd ./front && pnpm dev
```
