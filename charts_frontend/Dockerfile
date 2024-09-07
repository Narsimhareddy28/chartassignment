From node:20-alpine3.19

WORKDIR /app

copy package*.json .

RUN npm install

copy . .

Expose 3000

CMD ["npm", "run", "dev"]