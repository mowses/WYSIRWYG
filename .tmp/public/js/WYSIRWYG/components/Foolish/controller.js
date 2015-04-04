(function() {

	function Foolish() {
		this.alerta = function() {
			console.log('Foolish - alerta - this.alerta');
		}
	}
console.log('foooo', arguments);
	Foolish.prototype.alerta = function() {
		console.log('Foolish - alerta - prototype');
	}

	$.extend(WYSIRWYG.Components.controllers, {
		Foolish: Foolish
	});

	return Foolish;

})();