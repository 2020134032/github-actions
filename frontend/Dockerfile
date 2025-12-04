FROM node:22

WORKDIR /var/app

RUN npm install -g serve
COPY build ./build

EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin
RUN chmod u+x /usr/local/bin/docker-entrypoint.sh

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]
