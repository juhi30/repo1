FROM rhinogram/selenium-chrome:latest
LABEL description = 'NightWatch tests for Rhinogram Frontend'

RUN sudo mkdir -p /app

ADD conf /app/conf
ADD page_objects /app/page_objects
ADD test_files /app/test_files
ADD tests /app/tests

ADD .babelrc .eslintrc .jshintrc constants.js globals.js helpers.js magellan.json nightwatch.conf.js package.json yarn.lock /app/

RUN sudo chown -R seluser:seluser /app/
WORKDIR /app
RUN yarn build

CMD yarn canary
