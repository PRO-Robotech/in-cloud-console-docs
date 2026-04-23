# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder

WORKDIR /app

COPY documentation ./documentation

# --- Build documentation (Docusaurus) ---
WORKDIR /app/documentation
RUN npm i

ENV BASEURL="/docs/"
ENV Docusaurus_GIT_API_URL_STAR="https://api.github.com/repos/PRO-Robotech/openapi-ui"
ENV Docusaurus_GIT_API_URL_TAG="https://api.github.com/repos/PRO-Robotech/openapi-ui/tags"
ENV Docusaurus_GIT_URL="https://github.com/PRO-Robotech/openapi-ui"
ENV URL="http://example.com"
ENV TITLE=""
ENV DOC_INCLUDE_CURRENT_VERSION="false"

RUN npm run build

WORKDIR /app
RUN mkdir -p /dist/docs \
    && cp -R /app/documentation/build/* /dist/docs/ \
    && touch /dist/.nojekyll

FROM nginx:alpine

COPY --from=builder /dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
