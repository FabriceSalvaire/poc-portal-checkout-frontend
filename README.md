# React Donation Checkout Component

This repository implements a donation checkout component using the [React](https://reactjs.org)
framework (16.8 hooks) and [Material-UI](https://material-ui.com) React components for [Material
Design](https://material.io/design).

## Stack

* [React](https://reactjs.org) Web Framework
* [React Router](https://reactrouter.com)
* [Redux](https://redux.js.org)
* transpiled and bundled by [Webpack](https://webpack.js.org)
* [JSS](https://cssinjs.org) stylesheet
* Nginx HTTP proxy

## Features

* plugable in a HTML page as a component
* plugable in Wordpress as a shortcode block
* implement [WAI-ARIA](https://www.w3.org/TR/wai-aria) for accessibility

### reCAPTCHA Protection

* [Google reCAPTCHA](https://www.google.com/recaptcha)
* https://en.wikipedia.org/wiki/ReCAPTCHA
* https://developers.google.com/recaptcha/docs/v3
* https://github.com/t49tran/react-google-recaptcha-v3

* [hCaptcha](https://www.hcaptcha.com)
  hCaptcha is free to use for publishers of any size.
* https://github.com/hCaptcha/react-hcaptcha
* https://blog.cloudflare.com/moving-from-recaptcha-to-hcaptcha

# Alternative Implementations

* [Framasoft](https://framasoft.org/fr/#soutenir) which uses [Vue.js](https://vuejs.org) and
[BootstrapVue](https://bootstrap-vue.org).

# Discussion on the implementation

Actually popular frameworks are, sorted by trends:

1. [React](https://reactjs.org) backed by Facebook and the framework used by Wordpress
1. [Angular](https://angular.io) backed by Google and the successor of AngularJS
1. [Vue.js](https://vuejs.org) a popular framework created by Evan You, used by Alibaba

* [PReact](https://preactjs.com) a lightweight counterpart nearly compatible with the React API (4kB)
* [Riot](https://riot.js.org) a 7kB framework
* [Polymer](https://www.polymer-project.org)

## Issues

* duplicated code to to enforce that at least one toggle button must be active

# Running and Building the Application

Application is generated by the tool [Create React App](https://create-react-app.dev) that uses
Webpack internally.  See `package.json` for settings and
`node_modules/react-scripts/config/webpack.config.js`.

Note: **eslint-plugin-react-hooks** is included by default in Create React App.

1. Install [Node.js](https://nodejs.org/en) and [Yarn](https://yarnpkg.com) package manager
1. Install required packages in *node_modules* (it requires 425 MB of free space disk)
   ```
   yarn install

   or

   npm install
   ```
1. Build and serve the application for development
   ```
   yarn start

   or

   npm start
   ```
  **Note:** to customise the browser, uses e.g. `BROWSER="google-chrome" yarn start`
1. Go to http://localtest.me:3000/checkout
1. Build the application for production
   ```
   yarn build

   or

   npm run build
   ```

# Storybook

Start Storybook using `yarn storybook`

# Documentation using React Styleguidist

[React Styleguidist](https://react-styleguidist.js.org)

Start a style guide dev server using `npx styleguidist server`
