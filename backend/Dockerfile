FROM node:22

WORKDIR /var/app

COPY package.json package-lock.json ./
RUN npm ci --omit-dev

RUN mkdir src
COPY ./src/*.js ./src

ENV PORT=3031 \
    FRONTEND_URL="http://localhost:30030"

EXPOSE 3031

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl --fail http://localhost:3031/healthcheck || exit 1

ENTRYPOINT ["node", "."]
