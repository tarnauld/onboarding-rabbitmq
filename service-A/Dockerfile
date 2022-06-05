FROM node:18
ENV SERVICE_B_ADDR="service-b"
ENV SERVICE_B_PORT="3000"
COPY . /usr/src/onboarding-kafka
WORKDIR /usr/src/onboarding-kafka
EXPOSE 3000
RUN npm i
RUN npm run build
CMD ["node", "dist/index.js"]