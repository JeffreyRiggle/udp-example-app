FROM ubuntu:latest

RUN apt update
RUN apt install nodejs -y

COPY . ./src

EXPOSE 4000

CMD ["node", "/src/index.js"]