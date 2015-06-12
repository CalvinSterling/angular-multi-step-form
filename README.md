# Multi step form

The `multiStepForm` module allows one to easily create a multi step form
based on a sequence of "views".

## Requirements

    - ngAnimate (angular-animate)
    - IE9+

## Starting a multi step form

A multi step form is started by invoking the multiStepContainer directive as follow:

    <multi-step-container steps="yourSteps" initial-step="1">

Steps have to be supplied, and an initial step can be defined. By default, the initial
step is 1 (the first step). Specifying a custom initial step can for example be used to
resume a wizzard with prepopulated data.

## Defining steps

Each step is defined with the following properties,
in the same way routes or states are defined in an AngularJS application:

* `controller` (optional)
* `template` or `templateUrl` property (required)
* `resolve`
* `title`
* `hasForm`: whether or not a step contains a form. For example, a confirm or review
  step might not contain a form.
* `isolatedScope`: whether or not a form step form should be isolated. If isolated,
  the form step scope has still its multiFormContainer as a parent. If isolated,
  the multiStepForm's reference will be available to be injected in the form step's
  controller (`multiStepScope`). Default to false.

### Example

    scope.steps = {
        [
            title: 'Step 1',
            controller: 'Step1Ctrl'
            templateUrl: 'partial/step1.html',
            resolve: function () {
                data: ['$http', function ($http) {
                    return $http.get('data.json');
                }]
            },
            hasForm: true,
            isolatedScope: true
        ],
        [
            title: 'Step 2',
            controller: ['$scope', function ($scope) {
                $scope.colour = 'blue'
            }],
            template: 'Your favorite colour is {{colour}}'
        ]
    };

### Additional step controllers dependencies

The `formStepElement` factory is responsible for creating step elements, instanciating their controllers
and compiling their contents. When a controller is instanciated, two extra dependencies are available
to locally inject:

* `multiStepInstance`: the current instance of `MultiFormStep`.
* `multiStepScope`: the `multiStepContainer` directive scope, if the step's scope is isolated.

## Navigation

By supplying a search ID to the `multiStepContainer` directive, navigation will be enabled:

    <multi-step-container steps="yourSteps" search-id="'id1'">

The example above will add the search parameter 'id1' to your URL (you_url?id1=1).
When initialising a view, the initialStep property has the priority over an already defined
search parameter, allowing you to having total control over a manually entered URL when starting
the form.

## Providing header content

The content of a multi step container directive will be transcluded inside its
header element.

     <multi-step-form steps="yourSteps">Header content</multi-step-form>

Will result in:

    <section class="multi-step-container">
        <header class="multi-step-header" multi-step-header>
            Header content
        </header>

        <article class="multi-step-body" form-step-container></article>
    </section>


## How it works

The `multiStepContainer` directive is the starting point. Each `multiStepContainer` has its own instance
of a `MultiStepForm` object (provided by the `multiStepForm` factory) which provide controls such has: start,
nextStep, previousStep, finish, cancel, etc...

Form step elements are created with the help of the `formStepElement` factory. Each form step controller
(if provided) gets the MultiStepForm instance of its container available to inject (dependency is called
`multiStepFormInstance`). In addition, each form step scope is augmented with the following functions
from its multiStepFormInstance (with a `$` prefix): `MultiStepForm.cancel()`, `MultiStepForm.finish()`,
`MultiStepForm.getActiveIndex()`, `MultiStepForm.setActiveIndex()`, `MultiStepForm.getActiveStep()`,
`MultiStepForm.nextStep()`, `MultiStepForm.previousStep()` and `MultiStepForm.setValidity()`.

Each MultiStepForm object has a start method which is invoked by the multiStepContainer directive
in its postLink function. It returns a promise for avoiding an inversion of control:

* If the `MultiStepForm.cancel()` method is called, the promise is rejected and the onCancel
  callback is executed.
* If the `MultiStepForm.finish()` method is called, the promise is resolved and the onFinish
  callback is executed.
* The promise receives a notification each time there is a step change. The current form step
  element is destroyed and a new one is created.


## Step transitions

Animations can be performed using the following classes

* `ng-enter` or `ng-leave` (see https://docs.angularjs.org/api/ngAnimate/service/$animate#enter
  and https://docs.angularjs.org/api/ngAnimate/service/$animate#leave)
* A  class is added to the `multi-step-body` element: `step-initial` for the first step being rendered,
  and `step-forward` or `step-backward` thereafter depending on the "direction".

The entering and leaving animations are performed simutaneously (the leaving animation can be delayed
if data or template need to be resolved). If you want separate animation, introduce a delay in your CSS.
attribute for avoiding it.

## Callbacks

Callbacks can be supplied to the multiStepContainer directive.

    <multi-step-container steps="yourSteps"
        on-cancel="onCancel()" on-finish="onFinish()">

* `onCancel` attribute: the provided callback will be invoked when the multi step form is cancelled
* `onFinish` attribute: the provided callback will be invoked when the multi step form is finished

By default, the directive element and its scope are destroyed on cancel and on finish. If you want
to navigate away from the current view, you need to supply onCancel and onFinish callbacks.
