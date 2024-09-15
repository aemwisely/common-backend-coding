FROM node:18.20.4-alpine3.19 as installer

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn 

FROM node:18.20.4-alpine3.19 as builder

WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY libs ./libs
COPY src ./src
COPY nest-cli.json .
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY migrations ./migrations


RUN yarn build

FROM node:18.20.4-alpine3.19 as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY rsa.private /app/rsa.private
COPY key.pub /app/key.pub


CMD ["node", "dist/src/main.js"]