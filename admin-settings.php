<?php


function acfshopify_register_settings() {
    add_option( 'acfshopify_domain');
    add_option( 'acfshopify_access_token');
    register_setting( 'acfshopify_options', 'acfshopify_domain');
    register_setting( 'acfshopify_options', 'acfshopify_access_token');
}

add_action( 'admin_init', 'acfshopify_register_settings' );


function acfshopify_register_options_page() {
    add_options_page('ACF Shopify', 'ACF Shopify', 'manage_options', 'acfshopify', 'acfshopify_options_page');
}

add_action('admin_menu', 'acfshopify_register_options_page');

function acfshopify_options_page() {
?>
  <div>
    <h2>ACF Shopify</h2>
    <form method="post" action="options.php">
        <?php settings_fields( 'acfshopify_options' ); ?>
        <table class="form-table" role="presentation">
            <tbody>
                <tr>
                    <th scope="row">
                        <label for="acfshopify_domain">Domain</label>
                    </th>
                    <td>
                        <input type="text" id="acfshopify_domain" class="regular-text ltr" name="acfshopify_domain" value="<?php echo get_option('acfshopify_domain'); ?>" />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="acfshopify_access_token">Storefront Access Token</label>
                    </th>
                    <td>
                        <input type="text" id="acfshopify_access_token" class="regular-text ltr" name="acfshopify_access_token" value="<?php echo get_option('acfshopify_access_token'); ?>" />
                    </td>
                </tr>
            </tbody>
        </table>
        <?php submit_button(); ?>
    </form>
  </div>
<?php

}