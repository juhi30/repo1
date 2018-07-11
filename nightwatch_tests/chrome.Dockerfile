FROM selenium/standalone-chrome:latest
LABEL description="Image for testing Rhinofront in Chrome"

RUN mkdir -p /app

ADD package.json yarn.lock \
  nightwatch.conf.js \
  magellan.json helpers.js \
  global.js \
  .env \
  .babelrc /app/

ADD tests /app/tests
ADD test_files /app/test_files
ADD page_objects /app/page_objects
ADD conf /app/conf

RUN yarn

WORKDIR /app

CMD yarn test
