(function() {

	function Searcher() {
		this.alerta = function() {
			console.log('Searcher - alerta - this.alerta');
		}
	}

	Searcher.prototype.alerta = function() {
		console.log('Searcher - alerta - prototype');
	}

	$.extend(WYSIRWYG.Components.controllers, {
		searcher: Searcher
	});

	return Searcher;

})();