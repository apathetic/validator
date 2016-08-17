# Validator

A simple and extendable client-side form Validator.

## Overview

This a simple, extensible client-side validation class. It's "simple" because it includes only a small and basic set of validation functions. However, it's easily extensible so you may add your own types of custom validation.

While most other Validators require a particular accompanying Javascript framework, this one does not. Additionally, rather than a bloaty, full-featured validator, the approach taken herein is to create a basic validator that covers most general use-cases. If it doesn't cover yours, you can easily add any required functionality.</p>

## Getting Started

* with npm:  ```npm install @apathetic/validator```
* with git:  ```git clone git@github.com:apathetic/validator.git```

There is an ES6 module you may consume however you wish. Then:

**Check a form**
```javascript
var form = document.querySelector('#userForm');
var valid = Validator.check(form);
```

```html
<form id="userForm">
  <input id="email" name="email" data-validate="email" required />
</form>
```

**Check a form section**
This is useful if you have multi-page forms, or wish to selectively validate sections.
```javascript
var fieldset = document.querySelectorAll('fieldset');
var valid = Validator.check(fieldset[0]);
```

**Add a custom rule**
```javascript
// add a rule called "count" that checks an input's length
Validator.addRule('count', function count(val) {
  return val.length <= 40;
});
```
```html
<textarea data-validate="count" required>40 characters or less, here</textarea>
```

## Methods

| method | args | description |
| ------ | ----------- | ---------|
| check() | element (HTMLElement), success (Function) | Pass in a field or a DOM fragment. Checks if field (or fields within the fragment) are valid according to any data-validate/required attributes |
| addRule() | name (String), validator (Function) | Add your own validation function. The validation function receives the field value to check against. Use your new rule by placing _data-validate="name"_ on a field |


## Events

| Event | description |
| ------ | ---------|
| validation:failure | Triggered when a form/section fails validation. The target is the form/section used |
| validation:success | Triggered when a form/section passes validation. The target is the form/section used |

## Demo

After cloning the repo:
```
npm i
npm start
```

A server will spin up at ```http://localhost:8080```, where you may play with the various examples.

## Support
* IE9+
* Safari / Chrome
* Firefox
* iOS
* Android 4.0+

## Examples

Please see the _test / demo_ directory

## Release History

### 0.1
* first release
