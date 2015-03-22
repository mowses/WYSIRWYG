'use strict';

(function($, WYSIRWYG, Events, ObserverCore) {

	// initialization, not inside Object
	function _init() {
		var self = this;

		$.extend(this, new ObserverCore(), {
			events: new Events([
				'add component'
			]),
			components: []
		});

		this.setData({
			components: []
		})

		.events
			.on('add component', function(component) {
				component
					.watch(null, function(data) {
						// add/change data to stage's components
						var index = self.components.indexOf(this),
							stage_data = self.getData();

						stage_data.components[index] = data.new;
					});
			});
	}

	// the Object itself
	function Stage() {
		_init.apply(this);
	}

	// prototyping
	$.extend(Stage.prototype, {
		/**
		 * add component to the stage
		 * instantiate new Component and add it to `self.components` property
		 * then listen for changes within that component and set self.setData(components, ...)
		 */
		add: function(component_data) {
			var component = new WYSIRWYG.Component().setData(component_data);

			this.components.push(component);

			this.events.trigger('add component', component);

			return component;
		}
	});

	// add to WYSIRWYG
	$.extend(WYSIRWYG, {
		Stage: Stage
	});

})(jQuery, WYSIRWYG, Events, ObserverCore);