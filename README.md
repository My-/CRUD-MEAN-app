# Recipie

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Express end points:

`POST: /auth/localLogin` | login user | body.password body.username 

`GET: /user/`  | get user details

`POST: /user/` | create user

`PUT: /user/` | update user details

`DELETE: /user/` | remove user

`GET: /user/recipes/` | get user recipes

`GET: /user/comments/` | get user comments

``


# References:
- (Angular + pasport)https://www.youtube.com/watch?v=IlpU1z3cvSQ
- (passport + express) https://www.youtube.com/watch?v=CHodPpqLqG8&index=2&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
- (passportjs) http://www.passportjs.org/
- (MEAN + Angular6) https://auth0.com/blog/real-world-angular-series-part-1/
- (passportjs + github login) https://www.jokecamp.com/tutorial-passportjs-authentication-in-nodejs/
- (Angular + PWA) https://vitalflux.com/angular-6-create-pwa-progressing-web-app/
- (bcryptjs + passpotrjs) https://github.com/apoorvlala/Login-APP-using-Node.js-Expressjs-Passportjs-Bcryptjs-and-MongoDB
- (JWT) https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314
- (mangoose validators) https://github.com/leepowellcouk/mongoose-validator
- (express Link redirect) https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
- (Promises create) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- () https://scotch.io/tutorials/javascript-promises-for-dummies
- (Referencing another schema in Mongoose) https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose#18002078
- (remove mongo document references) https://stackoverflow.com/a/11905116/5322506
