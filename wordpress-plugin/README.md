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

<!-- * It requires Node JS -->
<!-- * Install NPM packages using the command `npm install` or `yarn install`, it must create a *node_module* directory -->
<!-- * Build using the command `npm start` or `yarn start` -->

<!-- **Build Output:** -->

<!-- ``` -->
<!-- ``` -->

<!-- It must create a *build* directory containing an *index.js* file. -->

<!-- It runs the [wp-script](https://developer.wordpress.org/block-editor/packages/packages-scripts/) tool. -->

## Wordpress and React

React framework is the foundation of the Gutenberg Wordpress page editor.

Wordpress provides the package
[Element](https://developer.wordpress.org/block-editor/packages/packages-element/) which is an
abstraction layer atop React.

Wordpress loads React for any page using a plugin that depends on `wp-element`, e.g. the page
editor.  See also `@PACKAGE-NAME@.php` and `build/index.asset.php`.

For example:
```
const { Component, render, useState } = wp.element;
```

**Note: we can only use this facility if we don't use React packages!**

## How to remove React from the bundle ?

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

HTML and CSS of the plugin should match the CSS of the Wordpress theme.  For example, if the theme
uses Bootstrap then a plugin should do the same.  Else styling conflicts could appear, because a CSS
theme could reset CSS defaults of tags like `<html>`, `<body>`, `<h1>`, `<input />`...  A workaround
is to re-reset the CSS in a `div` wrapper.  But it could be tricky to find the setting that breaks
your plugin ...

**Tips to find what break:**
* Check `<html>` and `<body>`rules for global resets.
* Take care to `rem` unit which is relative to page font size.
* Navigate into the DOM around a broken component and look for CSS rules from the theme which are
  placed above your plugin rules.
* Look especially for tags like <h1>, <input> ..., plugin's `<div>` are unlikely to be the issue.
* Spacing issues could arise from the parent box or children.

<!-- **Note:** to reset style uses `!important` rules -->

## Wordpress theme issues

* 2019 has little resets than 2020, just a some `h` and `input` customisation.
* 2020 has in addition a font scaling size issue due to `html { font-size: 62.5%; }` rule

Reset for 2020 theme:

```
html {
￼    /* font-size: 62.5%; */
￼    scroll-behavior: smooth;
}

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

* [Gutenberg — Block Editor project for WordPress](https://github.com/WordPress/gutenberg)
  https://github.com/WordPress/gutenberg-examples

* https://github.com/wordpress/twentytwenty
* location in Wordpress installation: `/wp-content/themes/twentytwenty`
* stylesheet is a 6k loc CSS file

## others resources

* https://github.com/acomito/react-material-ui-wordpress
  last on on 25 Jul 2016
