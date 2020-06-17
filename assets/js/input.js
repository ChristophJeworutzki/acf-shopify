(function($) {
    function initialize_field($el) {
        var $field = $el.find(".acf-shopify-field");
        var $select = $el.find(".js-acf-shopify-select");

        // Initializing a client to return content in the store's primary language
        var client = ShopifyBuy.buildClient({
            domain: SERVER_VARS.acfshopify_domain,
            storefrontAccessToken: SERVER_VARS.acfshopify_access_token
        });

        client.product.fetchAll().then(products => {
            var data = $.map(products, function(product) {
                return {
                    id: product.id,
                    text: product.title,
                    image: product.images[0],
                    product: product
                };
            });
            $select.select2({
                data: data,
                allowClear: true,
                placeholder: "Select a product",
                templateResult: formatState
            });

            $select.on("select2:select", function(e) {
                var data = e.params.data;
                $field.val(JSON.stringify(data.product));
            });

            $select.on("select2:unselect", function(e) {
                $field.val(null);
            });
        });
    }

    function formatState(state) {
        if (state.image) {
            return $(
                '<div style="display: inline-flex; align-items: center">' +
                    '<img src="' +
                    state.image.src +
                    '" style="width: 48px; height: 48px; object-fit: cover; margin-right: 10px" />' +
                    "<span>" +
                    state.text +
                    "</span></div>"
            );
        } else {
            return $("<span>" + state.text + "</span>");
        }
    }

    if (typeof acf.add_action !== "undefined") {
        /*
         *  ready append (ACF5)
         *
         *  These are 2 events which are fired during the page load
         *  ready = on page load similar to $(document).ready()
         *  append = on new DOM elements appended via repeater field
         *
         *  @type	event
         *  @date	20/07/13
         *
         *  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
         *  @return	n/a
         */

        acf.add_action("ready append", function($el) {
            // search $el for fields of type 'shopify'
            acf.get_fields({ type: "shopify" }, $el).each(function() {
                initialize_field($(this));
            });
        });
    } else {
        /*
         *  acf/setup_fields (ACF4)
         *
         *  This event is triggered when ACF adds any new elements to the DOM.
         *
         *  @type	function
         *  @since	1.0.0
         *  @date	01/01/12
         *
         *  @param	event		e: an event object. This can be ignored
         *  @param	Element		postbox: An element which contains the new HTML
         *
         *  @return	n/a
         */

        $(document).on("acf/setup_fields", function(e, postbox) {
            $(postbox)
                .find('.field[data-field_type="shopify"]')
                .each(function() {
                    initialize_field($(this));
                });
        });
    }
})(jQuery);
