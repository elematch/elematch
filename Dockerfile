FROM node:alpine as builder
ADD . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder dist/* /usr/share/nginx/html/