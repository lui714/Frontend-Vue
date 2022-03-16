FROM node:lts-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
ADD . .
RUN yarn install --include=dev
RUN yarn run build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]