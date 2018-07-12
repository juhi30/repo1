FROM rhinogram/selenium-chrome:latest
LABEL description="Automated Test Image"

ADD nightwatch_tests /home/selenium/nightwatch_tests
ADD screenshotter /home/selenium/screenshotter
ADD stressTest /home/selenium/stressTest
ADD package.json /home/selenium/

RUN sudo chmod -R 0777 /usr/bin/yarn
RUN sudo chmod -R 0777 /home/selenium

RUN cd /home/selenium/nightwatch_tests && yarn && \
  cd /home/selenium/stressTest && yarn && \
  cd /home/selenium/screenshotter && yarn

EXPOSE 4444
