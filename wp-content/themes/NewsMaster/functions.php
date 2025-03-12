<<<<<<< HEAD
<?php
function newsmaster_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'main_menu' => 'Menu Chính'
    ));
}
add_action('after_setup_theme', 'newsmaster_setup');
=======
<?php
function newsmaster_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'main_menu' => 'Menu Chính'
    ));
}
add_action('after_setup_theme', 'newsmaster_setup');
>>>>>>> 18cdc07 (update)
