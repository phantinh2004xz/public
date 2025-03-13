<?php get_header(); ?>
<main class="container mt-4">
    <div class="row">
        <!-- Nội dung chính -->
        <div class="col-md-8">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <div class="article-item">
    <div class="article-image">
        <a href="<?php the_permalink(); ?>">
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('medium', ['class' => 'img-fluid rounded']); ?>
            <?php endif; ?>
        </a>
    </div>
    <div class="article-content">
        <h5>
            <a href="<?php the_permalink(); ?>" class="text-dark fw-bold">
                <?php the_title(); ?>
            </a>
        </h5>
        <p class="text-muted"><?php the_excerpt(); ?></p>
    </div>
</div>


            <?php endwhile; else : ?>
                <p>Không có bài viết nào.</p>
            <?php endif; ?>
        </div>

        <!-- Sidebar -->
        <div class="col-md-4">
            <?php if (is_active_sidebar('sidebar-1')) : ?>
                <?php dynamic_sidebar('sidebar-1'); ?>
            <?php endif; ?>
        </div>
    </div>
</main>
<?php get_footer(); ?>
