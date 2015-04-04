(function() {

	function ResultBox() {
		this.alerta = function() {
			console.log('ResultBox - alerta - this.alerta');
		}
	}

	ResultBox.prototype.alerta = function() {
		console.log('ResultBox - alerta - prototype');
	}

	$.extend(WYSIRWYG.Components.controllers, {
		ResultBox: ResultBox
	});

	return ResultBox;

})();