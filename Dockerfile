FROM alpine:3 AS downloader

ARG PB_VERSION=0.22.20
ARG BUILDX_ARCH=linux_amd64

RUN apk add --no-cache \
    unzip \
    ca-certificates

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_${BUILDX_ARCH}.zip \
    && unzip pocketbase_${PB_VERSION}_${BUILDX_ARCH}.zip \
    && chmod +x /pocketbase

FROM alpine:3
RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
    
EXPOSE 8090

COPY --from=downloader /pocketbase /usr/local/bin/pocketbase

COPY ./pb_migrations /pb_migrations
COPY ./pb_hooks /pb_hooks
COPY ./pb_public /pb_public

VOLUME /pb_data

ENTRYPOINT ["/usr/local/bin/pocketbase"]
CMD ["serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--publicDir=/pb_public", "--hooksDir=/pb_hooks", "--migrationsDir=/pb_migrations"]
