<div id="reviews">
  <div id="reviews-result">
    <?php if ( have_posts() ) : ?>
      <hgroup class="heading">
        <h1 class="title">
          <?php
            $reviews_count = $wp_query->found_posts;
            $title = $reviews_count . ' ' . __( 'reviews', 'madeleine' );
            if ( $reviews_count == 1 )
              $title = '1 ' . __( 'review', 'madeleine' );
          ?> 
          <em id="reviews-title"><?php echo $title ?></em>
          <span class="icon icon-dropdown-grey"></span>
        </h1>
      </hgroup> 
      <?php madeleine_reviews_menu(); ?>
      <div id="lead">
        <div class="list reviews-list">
          <?php while ( have_posts() ) : the_post(); ?>
            <?php get_template_part( 'content', 'review' ); ?>
          <?php endwhile; ?>
          <?php madeleine_pagination(); ?>
        </div>
      </div>
    <?php else: ?>
      <hgroup class="heading">
        <h1 class="title">
          <em id="reviews-title"><?php _e( 'Sorry. No reviews match these parameters.', 'madeleine' ); ?></em>
          <span class="icon icon-dropdown-grey"></span>
        </h1>
      </hgroup> 
      <?php madeleine_reviews_menu(); ?>
    <?php endif; ?>
  </div>
  <div class="loading white"></div>
  <div style="clear: both;"></div>
</div>