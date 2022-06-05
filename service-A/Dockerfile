FROM node:latest
ENV SERVICE_B_ADDR="service-b"
ENV SERVICE_B_PORT="3000"
COPY . /usr/src/onboarding-rabbitmq
WORKDIR /usr/src/onboarding-rabbitmq
EXPOSE 3000
RUN npm i
RUN npm i -g ts-node
RUN npm run build
CMD ["ts-node", "-r", "tsconfig-paths/register", "dist/index.js"]