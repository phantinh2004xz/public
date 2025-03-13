<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'AjrLU$lG[xTx]b418un*3ul/Yk2f|`sQ~<;D]=F~gM[jbG N+d=1U,d|Roa-N[n_' );
define( 'SECURE_AUTH_KEY',   'tQQ<l@mfiA%&@rbvZ[&(127M,?aHZaMS&Y[R|/ytK~x,%%^J0<w2g0^w?hwkPE%e' );
define( 'LOGGED_IN_KEY',     'k!YZ_^mV~[!IQ*[n74+cDHFY-?pxOLc[`whT*ma5P!$r81)r%oh(Ns-vNU)w#D@N' );
define( 'NONCE_KEY',         'YigJ3=K;kWx{B*/$%&b@pi:_C#z 9wo1-,LqRc~^7H</I%`pA^Q-9W)(j.cJz|oc' );
define( 'AUTH_SALT',         '%6.E&)97?*=OxNq[07hu3s6#K&CK*pI%(hS%V*P9Bl,&rNu TMUZldj LO8p&d^{' );
define( 'SECURE_AUTH_SALT',  '2)Od4H9~V^`P6).voDh_dv=Tn8&YFe}w|i]cQa#)9T1^|F5ms6an#&8@.^HDF1P]' );
define( 'LOGGED_IN_SALT',    'sI:Kyv.-H~1^Th~|GJaVLniG;L:2t;B(IQg>Rqp }2J.Z@fn/Im*jP848SJzeT7f' );
define( 'NONCE_SALT',        'dE_y}@Dpt;pbW`LYBCHOc[:|`2 Zj*:d_7OD_rupu-iLPnWCboa9.h.-Zx5V_,Q~' );
define( 'WP_CACHE_KEY_SALT', ')-3{v#hbY.fP!VLYAloy(>5dbsPNO7&DU)dl$%9>;GHSy5Yy4O5n|/*Q[xx*}bKP' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
