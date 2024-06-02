FROM node:22-alpine3.20 AS build
ENV PNPM_HOME="/pnpm" \
    CI=1
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . .
RUN  pnpm install 
RUN pnpm run build

FROM node:22-alpine3.20
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

USER node
WORKDIR /app
EXPOSE 3000

CMD [ "node","dist/server.js"]