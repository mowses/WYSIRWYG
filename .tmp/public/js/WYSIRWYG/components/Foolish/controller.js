(function() {
	
	'use strict';

	function Foolish() {
		var self = this;

		this.alerta = function() {
			console.log('Foolish alerta runs - the current data is:', self);
		}
	}
	
	$.extend(WYSIRWYG.Components.controllers, {
		Foolish: Foolish
	});

	return Foolish;

})();