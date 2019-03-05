module.exports = {
    globalSetup: './jest-config/webdriver-setup.js',
    globalTeardown: './jest-config/webdriver-teardown.js',
    setupFilesAfterEnv: ['./jest-config/setup'],
    roots: ['./src/test'],
    verbose: true,
    testEnvironment: 'node',
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Rhinomatic Test Report"
        }]
    ]
};