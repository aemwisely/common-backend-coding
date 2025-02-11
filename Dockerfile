FROM node:20-alpine AS base

FROM base AS installer

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json

COPY libs ./libs
COPY src ./src
COPY nest-cli.json .
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN yarn build 

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/package.json
COPY rsa.private /app/rsa.private
COPY key.pub /app/key.pub
COPY migrations ./migrations

EXPOSE 3000

CMD ["node", "dist/main.js"]