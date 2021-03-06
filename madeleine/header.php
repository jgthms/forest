<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php global $page, $paged; wp_title( '|', true, 'right' ); bloginfo( 'name' ); $site_description = get_bloginfo( 'description', 'display' ); if ( $site_description && ( is_home() || is_front_page() ) ) { echo " | $site_description"; } if ( $paged >= 2 || $page >= 2 ) { echo ' | ' . sprintf( 'Page %s', max( $paged, $page ) ); } ?></title>
	<?php madeleine_fonts(); ?>
	<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>

<body data-url="<?php echo home_url() ?>" <?php body_class(); ?>>
	<?php if ( has_nav_menu( 'top-menu') ) : ?>
		<a id="top-icon"><span class="icon icon-menu"></span>Top Menu</a>
		<?php wp_nav_menu( array( 'container_id' => 'top-menu', 'menu_class' => 'menu wrap', 'theme_location' => 'top-menu' ) ); ?>
		<div style="clear: left;"></div>
	<?php endif; ?>
	<header id="header">
		<div id="level-header" class="level">
			<div class="wrap">
				<a id="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<hgroup>
						<h1 id="name">
							<?php bloginfo( 'name' ); ?>
						</h1>
						<h2 id="description"><?php bloginfo( 'description' ); ?></h2>
					</hgroup>
				</a>
				<br>
				<ul id="social-icons">
					<li class="social-rss"><a class="social-icon" href="<?php bloginfo( 'rss2_url' ); ?>"></a></li>
					<?php madeleine_social_links(); ?>
				</ul>
				<?php get_search_form(); ?>
				<div style="clear: both;"></div>
			</div>
		</div>
		<div id="level-navigation" class="level">
			<div class="wrap">
				<div id="navigation">
					<a id="nav-icon"><span class="icon icon-menu"></span>Navigation</a>
					<div id="nav-menu">
						<nav id="nav">
							<ul>
								<li><a class="nav-home" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="Home" rel="home"><span class="icon icon-home"></span><?php _e( 'Home', 'madeleine' ); ?></a></li>
								<?php echo madeleine_categories_list(); ?>
								<?php madeleine_reviews_link(); ?>
								<?php madeleine_format_icons(); ?>
							</ul>
							<div style="clear: left;"></div>
						</nav>
						<div id="trending">
							<?php madeleine_trending(); ?>
						</div>
					</div>
				</div>
				<div id="subnav">
					<?php madeleine_subnav(); ?>
				</div>
			</div>
		</div>
	</header>
