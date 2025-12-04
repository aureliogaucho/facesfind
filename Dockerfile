FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* /app/
RUN npm ci --only=production || npm install --only=production
COPY . /app
ENV PORT=8080
EXPOSE 8080
CMD ["node","server.js"]
