'use strict';

(function($, WYSIRWYG, Events, ObserverCore) {

	// initialization, not inside Object
	function _init() {
		$.extend(this, new ObserverCore(), {
			events: new Events([])
		});

		this.setData({})
		/*.watch(['components'], function(data) {
			// create `stage` if has components
			// otherwise remove `stage` object
			var self = this;
			if (!data.new.components.length) {
				this.stage = null;
				return;
			} else if (!this.stage) {
				this.stage = new WYSIRWYG.Stage();
			}

			$.each(data.diff.components, function(i, component) {
				self.stage.add(component);
			});
		})*/;
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