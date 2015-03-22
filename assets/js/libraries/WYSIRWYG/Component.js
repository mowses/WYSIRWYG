'use strict';

(function($, WYSIRWYG, Events, ObserverCore) {

	// initialization, not inside Object
	function _init() {
		$.extend(this, new ObserverCore(), {
			events: new Events([])
		});
	}

	// the Object itself
	function Component() {
		_init.apply(this);
	}

	// prototyping
	$.extend(Component, new ObserverCore());

	// add to WYSIRWYG
	$.extend(WYSIRWYG, {
		Component: Component
	});

	return Component;

})(jQuery, WYSIRWYG, Events, ObserverCore);