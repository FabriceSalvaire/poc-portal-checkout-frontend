# A donate test plugin for Wordpress

<!-- On Wordpress 5.5.1 -->
<!-- ![Screenshot](https://code.electrolab.fr/fabrice/) -->

## How to integrate the plugin in Wordpress

* Install the plugin directory in *wordpress/wp-content/plugins/*
* Check the plugin is listed in http://localhost/wordpress/wp-admin/plugins.php and activate it
  or using [wp-cli](https://wp-cli.org) ` ./wp plugin activate donate-test`
* Create a new page and add a **shortcode** block containing `[donate-test-app]` or in the code editor
  ```
  <!-- wp:shortcode -->
  [donate-test-app]
  <!-- /wp:shortcode -->
  ```

## How to Build the application

* It requires Node JS
* Install NPM packages using the command `npm install` or `yarn install`, it must create a *node_module* directory
* Build using the command `npm start` or `yarn start`

**Build Output:**

```
```

It must create a *build* directory containing an *index.js* file.

It runs the [wp-script](https://developer.wordpress.org/block-editor/packages/packages-scripts/) tool.

## Wordpress and React

React framework is the foundation of the Wordpress page editor.

Wordpress provides
[Element](https://developer.wordpress.org/block-editor/packages/packages-element/) which is an
abstraction layer atop React.

Wordpress loads React for any page using a plugin that depends on `wp-element`, e.g. the page
editor.  See also `@PACKAGE-NAME@.php` and `build/index.asset.php`.

For example:
```
const { Component, render, useState } = wp.element;
```

**Note: we can only use this if we don't use React packages.**

**How to remove React from the bundle ?**

* https://webpack.js.org/configuration/externals
* https://webpack.js.org/plugins/split-chunks-plugin

```
externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
},
```

```
splitChunks: {
    cacheGroups: {
        vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
        }
    }
}
```

## Versions

* Wordpress 5.5.1
* @wordpress/scripts@12.5.0
* webpack@4.44.2
* react@16.14.0
  http://localhost/wordpress/wp-includes/js/dist/vendor/react.min.js?ver=16.9.0
  http://localhost/wordpress/wp-includes/js/dist/vendor/react-dom.min.js?ver=16.9.0

# Wordpress Theme Stylesheet Conflict

* reset style using `!important` CSS rules

Reset for 2020 theme:

```
.entry-content > *:not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.is-style-wide) {
    max-width: 58rem;
    width: calc(100% - 4rem);
}


input[type="text"], input[type="password"], input[type="email"], input[type="url"], input[type="date"], input[type="month"], input[type="time"], input[type="datetime"], input[type="datetime-local"], input[type="week"], input[type="number"], input[type="search"], input[type="tel"], input[type="color"], textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: #fff;
    border-radius: 0;
    border-style: solid;
    border-width: 0.1rem;
    box-shadow: none;
    display: block;
    font-size: 1.6rem;
    letter-spacing: -0.015em;
    margin: 0;
    max-width: 100%;
    padding: 1.5rem 1.8rem;
    width: 100%;
}
```

# Resources

## Wordpress default theme: Twenty Twenty

* [Block Editor project for WordPress](https://github.com/WordPress/gutenberg)
  https://github.com/WordPress/gutenberg-examples

* https://github.com/wordpress/twentytwenty
* location in Wordpress installation: `/wp-content/themes/twentytwenty`
* stylesheet is a 6k loc CSS file

## others resources

* https://github.com/acomito/react-material-ui-wordpress
  last on on 25 Jul 2016
