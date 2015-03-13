element
	.parent()
		.height( 300 )
	.end()
	.accordion();

element
	.addBack()
		.height( 300 );

element
	.find().not()
		.height( 300 );

element
	.children()
		.bla()
		.blu()
	.end()
	.accordion();

element
	.children()
		.bla()
		.blu()
		.parent()
			.height( 300 )
		.end()
		.accordion();

element
	.children()
		.bla()
		.blu()
		.parent()
			.height( 300 )
		.end()
	.end()
	.accordion();


element
	.children()
		.bla()
		.blu()
		.parent()
			.height( 300 )
		.end()
	.end()
	.children()
		.bla()
		.blu()
		.parent()
			.height( 300 )
		.end()
	.end()
	.accordion();

this.buttons = allButtons
	.map( function() {
		return $( this ).button( "widget" )[ 0 ];
	} )
		.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )
		.filter( ":first" )
			.addClass( rtl ? "ui-corner-right" : "ui-corner-left" )
		.end()
		.filter( ":last" )
			.addClass( rtl ? "ui-corner-left" : "ui-corner-right" )
		.end()
	.end();

this.active.children( ".ui-accordion-header-icon" )
	.removeClass( icons.header )
	.addClass( icons.activeHeader );

this.headers
	.removeClass( "ui-accordion-icons" )
	.children( ".ui-accordion-header-icon" )
		.remove();

toShow
	.attr( "aria-hidden", "false" )
	.prev()
		.attr( {
			"aria-selected": "true",
			"aria-expanded": "true",
			tabIndex: 0
		} );

x
	.prev()
		.attr( "a", "b", {
			a: b
		}, d, [
			1, 2, 3
		] );

if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {
	$( event.currentTarget ).prev().focus();
}

// comment
element
	// comment
	.parent()
		// comment
		.height( 300 )
	// comment
	.end()
	// comment
	.accordion();

element
	.children()
		// comment
		.bla()
		// comment
		// comment
		.blu()
	.end()
	// comment
	.accordion();

element
	.children()
		.bla()
		.blu()
		.parent()
			// comment
			.height( 300 )
		.end()
		.accordion();

element
	.children()
		.bla()
		// comment
		.blu()
		.parent()
			.height( 300 )
		.end()
	// comment
	.end()
	.accordion();


element
	.children()
		// comment
		.bla()
		.blu()
		// comment
		.parent()
			.height( 300 )
		.end()
	.end()
	.children()
		.bla()
		.blu()
		// comment
		.parent()
			// comment
			.height( 300 )
		.end()
	.end()
	// comment
	.accordion();

// comment
this.active.children( ".ui-accordion-header-icon" )
	// comment
	.removeClass( icons.header )
	// comment
	.addClass( icons.activeHeader );

// comment
this.headers
	// comment
	.removeClass( "ui-accordion-icons" )
	// comment
	.children( ".ui-accordion-header-icon" )
		// comment
		.remove();

// comment
if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {
	// comment
	$( event.currentTarget ).prev().focus();
}
