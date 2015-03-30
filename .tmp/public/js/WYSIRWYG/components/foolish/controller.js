(function() {

	function Foolish() {
		this.alerta = function() {
			console.log('Foolish - alerta - this.alerta');
		}
	}

	Foolish.prototype.alerta = function() {
		console.log('Foolish - alerta - prototype');
	}

	$.extend(WYSIRWYG.Components.controllers, {
		foolish: Foolish
	});

	return Foolish;

})();