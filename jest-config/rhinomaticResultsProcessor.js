function processTestResults(results){
  console.log(results)
  if(results.numFailedTests != 0 || results.numFailedTestSuites !=0){
    process.exit(1);
  }
  return results;
}

module.exports = processTestResults;