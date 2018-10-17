# default to develop
if [ -z "$CIRCLE_BRANCH" ]; then
  CIRCLE_BRANCH=develop
fi

rm -rf nightwatch_tests/reports-$CIRCLE_BRANCH
aws s3 cp s3://nightwatch-results-$CIRCLE_BRANCH nightwatch_tests/reports-$CIRCLE_BRANCH --recursive
