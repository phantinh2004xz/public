<<<<<<< HEAD
<?php get_header(); ?>
<main class="container mt-4">
    <h1><?php single_cat_title(); ?></h1>
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <p><?php the_excerpt(); ?></p>
    <?php endwhile; endif; ?>
</main>
<?php get_footer(); ?>
=======
<?php get_header(); ?>
<main class="container mt-4">
    <h1><?php single_cat_title(); ?></h1>
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <p><?php the_excerpt(); ?></p>
    <?php endwhile; endif; ?>
</main>
<?php get_footer(); ?>
>>>>>>> 18cdc07 (update)
