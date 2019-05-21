# default to develop
if [ -z "$CIRCLE_BRANCH" ]; then
  CIRCLE_BRANCH=develop
fi

rm -rf reports-$CIRCLE_BRANCH
aws s3 cp s3://rhinomatic-results-$CIRCLE_BRANCH reports-$CIRCLE_BRANCH --recursive
