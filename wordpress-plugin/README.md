# A donate test plugin for Wordpress

On Wordpress 5.5.1

![Screenshot](https://code.electrolab.fr/fabrice/)

## How to integrate the plugin in Wordpress

* Install the plugin directory in *wordpress/wp-content/plugins/*
* Check the plugin is listed in http://localhost/wordpress/wp-admin/plugins.php and activate it
  or using [wp-cli](https://wp-cli.org) ` ./wp plugin activate donate-test`
* Create a new page and add a **shortcode** block containing `[example-react-app]` or in the code editor
  ```
  <!-- wp:shortcode -->
  [example-react-app]
  <!-- /wp:shortcode -->
  ```

## How to Build the application

* It requires Node JS
* Install NPM packages using the command `npm install`, it must create a *node_module* directory
* Build using the command `npm start`

**Build Output:**

```
```

It must create a *build* directory containing an *index.js* file.

It runs the [wp-script](https://developer.wordpress.org/block-editor/packages/packages-scripts/) tool.

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

* https://github.com/wordpress/twentytwenty
* location in Wordpress installation: `/wp-content/themes/twentytwenty`
* stylesheet is a 6k loc CSS file

## others resources

* https://github.com/acomito/react-material-ui-wordpress
  last on on 25 Jul 2016
