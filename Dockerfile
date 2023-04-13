###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node .env.example .env
RUN yarn global add @nestjs/cli

RUN yarn install --no-cache --ignore-platform

COPY --chown=node:node . .

USER node