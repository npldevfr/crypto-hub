FROM node:slim

SHELL ["/bin/bash", "-c"]

RUN npm install --global pnpm@latest \
    && SHELL=bash pnpm setup \
    && source /root/.bashrc \
    && pnpm config set store-dir /root/.local/share/pnpm/store \

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
