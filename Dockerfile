FROM node:8
EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
CMD ["npm", "start"]