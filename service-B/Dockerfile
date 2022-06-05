FROM node:18
ENV PORT="3000"
COPY . /usr/src/onboarding-kafka
WORKDIR /usr/src/onboarding-kafka
EXPOSE 3001
RUN npm i
RUN npm run build
CMD ["node", "dist/index.js"]