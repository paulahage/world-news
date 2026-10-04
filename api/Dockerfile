FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY index.js countries.json results.json ./

EXPOSE 3003
CMD ["npm", "start"]
