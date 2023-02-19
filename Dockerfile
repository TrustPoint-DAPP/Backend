FROM node:18

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src ./src
COPY tsconfig.json .
COPY .env .env
COPY prisma ./prisma
ENV NODE_ENV=development
RUN yarn migrate dev
RUN yarn build -b
EXPOSE 8000
CMD [ "node", "--experimental-json-modules", "dist/index.js" ]
