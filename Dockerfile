FROM rhinogram/selenium-chrome:latest
LABEL description="Automated Test Image"

RUN sudo mkdir -p /rhinomatic
RUN sudo chmod -R 0777 /rhinomatic
ADD nightwatch_tests /rhinomatic/nightwatch_tests
ADD screenshotter /rhinomatic/screenshotter
ADD stressTest /rhinomatic/stressTest

RUN cd /rhinomatic/nightwatch_tests && sudo yarn && \
  cd /rhinomatic/stressTest && sudo yarn && \
  cd /rhinomatic/screenshotter && sudo yarn

RUN sudo chmod -R 0777 /rhinomatic
WORKDIR /rhinomatic

EXPOSE 4444
