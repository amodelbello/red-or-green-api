FROM node:8
EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN rm -r node_modules && npm install && npm cache clean --force
CMD ["npm", "start"]