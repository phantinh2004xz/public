<?php
function newsmaster_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'main_menu' => 'Menu Chính'
    ));
}
add_action('after_setup_theme', 'newsmaster_setup');
function register_my_menu() {
    register_nav_menu('main-menu', __('Main Menu'));
}
add_action('after_setup_theme', 'register_my_menu');
add_filter('show_admin_bar', '__return_true');
