FROM node:20.4.0 AS builder

WORKDIR /app
COPY *.json .
COPY *.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20.4.0-alpine3.14
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./
CMD ["yarn","start:prod"]


