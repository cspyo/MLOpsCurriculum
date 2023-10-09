FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile;

# INSTALL DEPENDENCIES & BUILD FOR PRODUCTION
FROM base AS build
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN yarn build

ENV NODE_ENV production
RUN yarn install --frozen-lockfile --production;

# PRODUCTION IMAGE
FROM base AS production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8000

CMD [ "node", "dist/main.js" ]