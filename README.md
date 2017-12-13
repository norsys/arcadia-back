Back API for Arcadia application
===

[![Build Status](https://travis-ci.org/norsys/arcadia-back.svg?branch=master)](https://travis-ci.org/norsys/arcadia-back)


What is Arcadia ?
--

Arcadia is an application to help newcomers to a society to better integrate into society.
This is a PWA based on the game.

In this GIT repository, this is the BACK part of the application. This is an API made in nodeJS with ExpressJs


How To install this application ?
--


```
npm install
```

How To start this application ?
--

```
npm start
```

How To run tests ?
--

```
npm test
```

Where is the continuous integration?
--

On Travis : https://travis-ci.org/norsys/arcadia-back


Where is the application deployed?
--

On Norsys plateform.


List of available resources
--


| Resource      |     Method    |   Describe |
| ------------- | ------------- | --------- |
| /v1/users     |  GET,POST,PUT,DELETE        |  Resources related to user management |
| /v1/auth       |        GET,POST,PUT,DELETE        |      Resources related to the authentification |
| /v1/agencies     |        GET,POST,PUT,DELETE        |      Resources related to agencies |
| /v1/categories     |        GET,POST,PUT,DELETE        |      Resource related to categories of different questions |
| /v1/questions     |        GET,POST,PUT,DELETE        |      Resource related to user questions  |
| /v1/users/:user_id/responses     |        GET,POST        |      Resources related to responses of users |
| /v1/images     |        GET,POST        |      Resource related to downloading and uploading images |