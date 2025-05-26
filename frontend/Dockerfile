# Stage 1: Build Vite app
FROM node:20 AS build

WORKDIR /app

# Copy .env and install deps
COPY package*.json ./
RUN npm install

# Copy app source and build
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
