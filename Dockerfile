FROM node:18-alpine as base

FROM base as installer

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

FROM base as builder

WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY libs ./libs
COPY src ./src
COPY nest-cli.json .
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY migrations ./migrations

RUN yarn build && \
    yarn cache clean

FROM base as runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY rsa.private /app/rsa.private
COPY key.pub /app/key.pub

# Install only production dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

CMD ["node", "dist/src/main.js"]