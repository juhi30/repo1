FROM rhinogram/selenium-chrome:latest
LABEL description="Automated Test Image For Nightwatch Client"

RUN sudo mkdir -p /home/selenium/nightwatch
ADD package.json magellan.json .eslintrc .babelrc yarn.lock global.js helpers.js nightwatch.conf.js /home/selenium/nightwatch/
ADD tests /home/selenium/nightwatch/tests
ADD test_files /home/selenium/nightwatch/test_files
ADD page_objects /home/selenium/nightwatch/page_objects
ADD conf /home/selenium/nightwatch/conf

RUN sudo chmod -R 0777 /usr/bin/yarn
RUN sudo chmod -R 0777 /home/selenium/nightwatch

RUN cd /home/selenium/nightwatch && yarn
WORKDIR /home/selenium/nightwatch

EXPOSE 4444

CMD yarn test
