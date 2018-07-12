FROM rhinogram/selenium-chrome:latest
LABEL description="Automated Test Image"

RUN sudo mkdir -p /rhinomatic
RUN sudo chmod -R +x /rhinomatic
ADD nightwatch_tests /rhinomatic/nightwatch_tests
ADD screenshotter /rhinomatic/screenshotter
ADD stressTest /rhinomatic/stressTest

RUN cd /rhinomatic/nightwatch_tests && yarn && \
  cd /rhinomatic/stressTest && yarn && \
  cd /rhinomatic/screenshotter && yarn

WORKDIR /rhinomatic

EXPOSE 4444
