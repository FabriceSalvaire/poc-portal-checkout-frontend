<?php
/**
 * @package Donate Test Plugin
 */
/*
Plugin Name: Donate Test
Plugin URI: https://...
Description: A donate test plugin.
Version: 1.0.0
Author: Fabrice Salvaire
Author URI: https://fabrice-salvaire.fr
License: GPLv3
Text Domain: ...
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 3
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Copyright 2020 Fabrice Salvaire
*/

define( 'DONATE_TEST_VERSION', '1.0.0' );
define( 'DONATE_TEST__MINIMUM_WP_VERSION', '5.5' );
define( 'DONATE_TEST__PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Registers a shortcode that simply displays a placeholder for our React App.
 */

function donate_test_app_register_shortcodes(){
  // Adds a new shortcode
  //   add_shortcode( string $tag, callable $callback )
  //   https://developer.wordpress.org/reference/functions/add_shortcode
  add_shortcode( 'donate-test-app', 'donate_test_app_callback' );
}

function donate_test_app_callback( $atts = array(), $content = null , $tag = 'donate_test_app' ){
    // Turn on output buffering
    //   https://www.php.net/manual/en/function.ob-start.php
    ob_start();

    ?>
        <div id="app">App goes here</div>
    <?php

    // Enqueue a script
    //   wp_enqueue_script( string $handle, string $src = '', array $deps = array(), string|bool|null $ver = false, bool $in_footer = false )
    //   https://developer.wordpress.org/reference/functions/wp_enqueue_script
    // Add in footer <script src="http://localhost/wordpress/wp-content/plugins/react-example/build/index.js?ver=1603502594" id="donate-test-app-js"></script>
    wp_enqueue_script( 'donate-test-app-runtime', plugins_url( 'build/static/js/runtime-main.d2d326aa.js', __FILE__ ), array(), time(), true );
    wp_enqueue_script( 'donate-test-app-chunk',   plugins_url( 'build/static/js/2.4ad7ae47.chunk.js', __FILE__ ), array(), time(), true );
    wp_enqueue_script( 'donate-test-app-main',    plugins_url( 'build/static/js/main.908bbc50.chunk.js', __FILE__ ), array(), time(), true );

    // Enqueue a CSS stylesheet.
    //   wp_enqueue_style( string $handle, string $src = '', string[] $deps = array(), string|bool|null $ver = false, string $media = 'all' )
    //   https://developer.wordpress.org/reference/functions/wp_enqueue_style/
    // wp_enqueue_style( 'donate-test-app-css', plugins_url( 'build/index.css', __FILE__ ) );
    wp_enqueue_style( 'roboto-font', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' );

    // Get current buffer contents and delete current output buffer
    //   https://www.php.net/manual/en/function.ob-get-clean.php
    return ob_get_clean();
}

// Hooks a function on to a specific action.
//   add_action( string $tag, callable $function_to_add, int $priority = 10, int $accepted_args = 1 )
//   https://developer.wordpress.org/reference/functions/add_action
add_action( 'init', 'donate_test_app_register_shortcodes' );
