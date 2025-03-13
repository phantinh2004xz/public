<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?></title>
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
    <?php wp_head(); ?> <!-- Bổ sung để hỗ trợ WordPress -->
</head>
<body>
<?php wp_body_open(); ?> <!-- Hỗ trợ chèn code từ plugin -->

<header>
    <h1>
        <a href="<?php echo esc_url(home_url('/')); ?>">
            <?php bloginfo('name'); ?>
        </a>
    </h1>
    <p><?php bloginfo('description'); ?></p>
</header>

<nav class="main-navigation">
    <?php
    wp_nav_menu(array(
        'theme_location' => 'main-menu',
        'menu_class' => 'menu',
        'container' => false // Xóa container mặc định để dễ styling
    ));
    ?>
</nav>
