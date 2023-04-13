###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node .env.example .env
RUN npm install --location=global @nestjs/cli

RUN yarn install --no-cache --ignore-platform

COPY --chown=node:node . .

RUN chown -R node:node ./node_modules

USER node
