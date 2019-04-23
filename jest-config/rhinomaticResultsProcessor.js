function processTestResults(results){
  if(results.numFailedTests != 0 || results.numFailedTestSuites !=0){
    process.exit(1);
  }
  return results;
}

module.exports = processTestResults;