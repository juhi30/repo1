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
            "pageTitle": "Rhinomatic Quality Automation Report",
            "outputPath": "./results/test-report.html",
            "includeFailureMsg": true,
            "includeConsoleLog": true,
            "logo": "https://www.rhinogram.com/wp-content/uploads/2018/08/Rhinogram.png" 
        }],
        [ "jest-junit", { 
            "outputName": "test-report.xml", 
            "suiteName": "Rhinomatic Quality Automation Report",
            "usePathForSuiteName": "true",
            "outputDirectory": "results",
        }]
    ]
};