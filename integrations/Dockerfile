FROM rhinogram/node-8.11:latest
LABEL maintainer='Rhinogram, LLC'
LABEL description='Rhinogram messenger agent'

RUN mkdir -p /app

ADD src /app/src
ADD .babelrc package.json yarn.lock .eslintrc .eslintignore /app/

WORKDIR /app

RUN yarn
RUN yarn build:production

CMD yarn start
