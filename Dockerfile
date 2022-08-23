FROM node:16.17.0 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm ci

COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:stable-alpine
RUN mkdir /app
RUN addgroup -g 1001 -S app && \
  adduser -u 1001 -S app -G app && \
  chown -R app:app /app && \
  chown -R app:app /var/cache/nginx && \
  touch /var/run/nginx.pid && \
  chown -R app:app /var/run/nginx.pid && \
  chmod 770 /app
USER app:app
WORKDIR /app
COPY --chown=app:app nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chown=app:app nginx/app.conf /etc/nginx/conf.d/default.conf
COPY --chown=app:app --from=build /app/build ./

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
