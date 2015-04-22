(function() {
	
	'use strict';

	function Foolish(data) {
		var self = this;

		this.alerta = function() {
			console.log('Foolish alerta runs - the current data is:', self, data.data);
		}
	}
	
	$.extend(WYSIRWYG.Components.controllers, {
		Foolish: Foolish
	});

	return Foolish;

})();