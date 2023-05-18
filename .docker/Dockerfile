FROM node:16.13.0 as dev
WORKDIR /app

# PhantomJS requires  an OpenSSL config even if it's an empty one,
# else it'll complain about "libssl_conf.so: cannot open shared object file"
# which seems to be a recent bug.
ENV OPENSSL_CONF=/opt/openssl.cnf

ENV TZ="America/Sao_Paulo"
EXPOSE 3000
COPY .docker/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
RUN apt-get update && apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2
RUN ["chmod", "+x", "/entrypoint.sh"]
CMD ["/bin/bash"]

FROM node:16.13.0 as build
WORKDIR /app
COPY . .
RUN npm install --quiet
RUN npm run build
RUN npm prune --production

FROM node:16.13.0 as prod
ENV NODE_ENV=production
ENV TZ="America/Sao_Paulo"
WORKDIR /app
COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/dist /app
RUN apt-get update && apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2
EXPOSE 3000
CMD ["node", "server.js"]
