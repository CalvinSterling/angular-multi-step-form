module.exports = function (config) {
  config.set({
    /**
     * From where to look for files, starting with the location of this file.
     */
    basePath: '',
    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/*.js',
      'src/**/*.js',
      'src/**/*.html',
      'tests/*.js'
    ],

    frameworks: [ 'jasmine' ],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ],
    /**
     * How to report, by default.
     */
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        dir: 'coverage',
        reporters: [
            {type: 'lcov'}
        ],
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      prependPrefix: 'multi-step-form/',
      moduleName: 'multiStepForm.templates'
    },

    preprocessors: {
      'src/**/*.js': ['coverage'],
      'src/**/*.html': ['ng-html2js']
    },

    port: 9876,
    colors: true,
    singleRun: true,
    autoWatch: false,
    browsers: ['Chrome']
  });
};

