FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# sudo docker build -t my-portfolio .
# sudo docker run -p 3000:3000 --env-file .env my-portfolio
