FROM node:20-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.27.0-alpine
COPY --from=build /app/dist/technova-app/browser /usr/share/nginx/html
EXPOSE 80