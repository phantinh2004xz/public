<<<<<<< HEAD
<?php get_header(); ?>
<main class="container mt-4">
    <h1>Trang chủ</h1>
    <div class="row">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <div class="col-md-4">
                <div class="card">
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium', ['class' => 'card-img-top']); ?></a>
                    <?php endif; ?>
                    <div class="card-body">
                        <h5 class="card-title"><?php the_title(); ?></h5>
                        <p class="card-text"><?php the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>" class="btn btn-primary">Xem chi tiết</a>
                    </div>
                </div>
            </div>
        <?php endwhile; else : ?>
            <p>Không có bài viết nào.</p>
        <?php endif; ?>
    </div>
</main>
<?php get_footer(); ?>
=======
<?php get_header(); ?>
<main class="container mt-4">
    <h1>Trang chủ</h1>
    <div class="row">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <div class="col-md-4">
                <div class="card">
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium', ['class' => 'card-img-top']); ?></a>
                    <?php endif; ?>
                    <div class="card-body">
                        <h5 class="card-title"><?php the_title(); ?></h5>
                        <p class="card-text"><?php the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>" class="btn btn-primary">Xem chi tiết</a>
                    </div>
                </div>
            </div>
        <?php endwhile; else : ?>
            <p>Không có bài viết nào.</p>
        <?php endif; ?>
    </div>
</main>
<?php get_footer(); ?>
>>>>>>> 18cdc07 (update)
