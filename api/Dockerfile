FROM node:18.14.2-slim as base

RUN npm install --global pnpm@latest

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

COPY . .

CMD ["pnpm", "dev"]
EXPOSE 3333
