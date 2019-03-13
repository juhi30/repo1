module.exports = {
    globalSetup: './jest-config/webdriver-setup.js',
    globalTeardown: './jest-config/webdriver-teardown.js',
    setupFilesAfterEnv: ['./jest-config/setup'],
    roots: ['./src/test'],
    verbose: true,
    testEnvironment: 'node',
    testResultsProcessor: "./jest-config/rhinomaticResultsProcessor.js",
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Rhinomatic Quatlity Automation Report",
            "outputPath": "./test-report.html",
            "includeFailureMessage": true,
        }],
        [ "jest-junit", { 
            "outputName": "./test-report.xml", 
            "suiteName": "Rhinomatic Quatlity Automation Report",
            "usePathForSuiteName": "true",
            "outputDirectory": ".",
        }]
    ]
};