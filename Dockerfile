FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src ./src
COPY tsconfig.json .
COPY prisma ./prisma

RUN yarn generate
RUN yarn build -b
RUN npm prune --production

FROM node:18-alpine

EXPOSE 8000
CMD [ "node", "dist/index.js" ]

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
