FROM node:16.13.2-alpine as builder
WORKDIR /app

# Building npm project
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21-alpine

# Build to nginx default
COPY --from=builder /app/build /usr/share/nginx/html

# Port exposure
EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY env-variables.sh .
COPY .env .
# COPY .env.production .

# Add bash
RUN apk add --no-cache bash

# chmod
RUN chmod o+x env-variables.sh

# crlf to lf -> Doesn't work for some reason
#RUN tr -d '\015' < env-variables.sh > env-variables.sh

# nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Starting nginx
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env-variables.sh && nginx -g \"daemon off;\""]