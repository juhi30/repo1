FROM rhinogram/selenium:latest
LABEL description="Automated Test Image"

RUN mkdir -p /rhinomatic
ADD nightwatch_tests /rhinomatic/nightwatch_tests
ADD screenshotter /rhinomatic/screenshotter
ADD stressTest /rhinomatic/stressTest

RUN cd /rhinomatic/nightwatch_tests && yarn && \
  cd /rhinomatic/stressTest && yarn && \
  cd /rhinomatic/screenshotter && yarn

WORKDIR /rhinomatic

EXPOSE 4444
