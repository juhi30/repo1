FROM rhinogram/selenium-chrome:latest
LABEL description="Automated Test Image For Chrome Nightwatch"

ADD package.json magellan.json .eslintrc .babelrc yarn.lock global.js /home/selenium/
ADD tests /home/selenium/tests
ADD test_files /home/selenium/test_files
ADD page_objects /home/selenium/page_objects
ADD conf /home/selenium/conf

RUN sudo chmod -R 0777 /usr/bin/yarn
RUN sudo chmod -R 0777 /home/selenium

WORKDIR /home/selenium
RUN yarn

EXPOSE 4444

CMD yarn nightwatch
