[![Build Status](https://travis-ci.org/troch/angular-multi-step-form.svg?branch=master)](https://travis-ci.org/troch/angular-multi-step-form)
[![Coverage Status](https://coveralls.io/repos/troch/angular-multi-step-form/badge.svg?branch=master)](https://coveralls.io/r/troch/angular-multi-step-form?branch=master)

# Angular Multi step form

`multiStepForm` is an angular module to create multi step forms and wizards. Create your steps like your would
create your views with ngRoute or ui-router!

It is lightweight (6kb minified) but extremely versatile and powerful.


## Requirements

- IE9+
- Angular (tested with 1.3, should work with 1.2)


## Features

- Steps are controlled views and are easily configured
- Asynchronous loading of steps (`templateUrl` and `resolve`)
- Forward and backward animations
- Isolated or non isolated scopes for steps
- Track step validity if it contains a form
- `onCancel` and `onFinish` callbacks
- Browser navigation with search URL parameter
- You decide what level of control you expose to the user: next, previous, jump to state, finish, cancel, etc...
- Support for multiple components per view


## Getting started

Grab the sources with bower or download from Github: [https://github.com/troch/angular-multi-step-form/tree/master/dist](./dist):

    $ bower install --save-dev angular-multi-step-form

Include the `multiStepForm` module in your app:

    angular.module('yourApp', [
        'multiStepForm'
    ]);

You can then configure your steps

    $scope.steps = [
        {
            template: 'Hello <button class="btn btn-default" ng-click="$nextStep()">Next</button>'
        },
        {
            template: 'World <button class="btn btn-default" ng-click="$previousStep()">Previous</button>'
        }
    ];

And start your multiple step form / wizard:

    <multi-step-container steps="yourSteps">


## Examples

- [Getting started](http://blog.reactandbethankful.com/angular-multi-step-form/#/getting-started)
- More to come


## Docs

- [Configuring steps](./docs/configuring-steps.md)
- [Header content](./docs/header-content.md)
- [Animations, navigation, callbacks](../docs/navigation.md)
- [Advanced guide](./docs/advanced-guide.md)
