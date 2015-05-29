(function() {
	
	'use strict';

	function Foolish(scope) {
		var self = this;

		this.setTodayBirthDate = function() {
			var now = new Date(),
				day = '' + now.getDate(),
				day = (day.length <= 1 ? '0': '') + day,
				month = '' + (now.getMonth() + 1),
				month = (month.length <= 1 ? '0' : '') + month;
				
			scope.data.data.birthday = now.getFullYear() + '-' + month + '-' + day;
			console.log('Foolish setTodayBirthDate runs - current birthdate is:', scope.data.data.birthday);
		};

		this.setOldBirthDate = (function() {
			var old_birthdate = scope.data.data.birthday;

			return function() {
				scope.data.data.birthday = old_birthdate
				console.log('Foolish setOldBirthDate runs - current birthdate is:', scope.data.data.birthday);
			}
		})();

		this.logInputText = function() {
			console.log('Foolish logInputText runs:', scope.data.components.ResultBox.data.query);
		}
	}
	
	$.extend(WYSIRWYG.Components.controllers, {
		Foolish: Foolish
	});

	return Foolish;

})();