FROM node:slim

SHELL ["/bin/bash", "-c"]

RUN npm install --global pnpm@latest \
    && SHELL=bash pnpm setup \
    && source /root/.bashrc \
    && pnpm config set store-dir /root/.local/share/pnpm/store

EXPOSE 3333

