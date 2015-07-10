'use strict';

angular.module('WYSIRWYG', [
    'WYSIRWYG.modules.Editor',
    'WYSIRWYG.modules.Editor.Raw'
])

.factory('findComponents', function() {

    return function(components, callback) {
        components = $.makeArray(components);

        $.get('/components/get', {
            components: components
        }, function(data) {
            callback ? callback(data) : null;
        });
    }
})

.factory('getComponents', ['prototypeComponents', function(prototypeComponents) {

    return function(callback) {
        $.get('/components', function(data) {
            var prototyped_data = prototypeComponents($.makeArray(data));
            callback(prototyped_data);
        });
    }
}])

.factory('prototypeComponents', function() {
    function prototypeComponents(data) {
        var components = {};

        $.each(data || [], function(i, data) {
            components[data.id] = data;
        });

        $.each(components, function(k, component) {
            var extends_from = component.extendsFrom;

            if (!extends_from) return;

            component.__proto__ = components[extends_from];
        });

        return components;
    }

    return function(data) {
        return prototypeComponents(data);
    }
})

/*.factory('mergeReferences', function() {
    function mergeReferences(components, references) {
        $.each(components || [], function(i, component) {
            var k = component.id;

            mergeReferences(component.components, references);
            if (component.reference) {
                var reference = $.grep(references, function(ref) {
                    // dont use "===" as comparator
                    // because 2 is not === "2"
                    return (ref.id == component.reference);
                })[0];

                components[i] = $.extend(true, {}, reference, component);
            }
        });
    }

    return function(components) {
        return mergeReferences(components, components);
    }
})*/

.factory('getParentLanguage', function() {
    function getParentLanguage(scope) {
        if (scope.language) return scope.language;
        if (!scope.$parent) return;

        return getParentLanguage(scope.$parent);
    }

    return function(scope) {
        return getParentLanguage(scope);
    }
})

.factory('generateCSS', function() {
    return function(id, jss) {
        var css = JSS.toCSS(ObserverCore.utils.object(['#' + id], jss)),
            head = $('head'),
            style = (css ? $('<style id="style-' + id + '">' + css + '</style>') : $(null));

        head
            .find('#style-' + id)
            .remove()
            .end()
            .append(style);
    }
})

/**
 * get component available themes
 * return theme names
 */
.factory('getThemes', function() {

    return function getThemes(component) {
        var themes = [];

        $.each(component.styles || [], function(k) {
            if (k.substr(0, 2) != '&.') return;

            var theme_name = k.substr(2);

            themes.push(theme_name);
        });

        return themes;
    }
})

/**
 * get component available languages
 * return languages names
 */
.factory('getLanguages', function() {

    return function getLanguages(component) {
        var languages = [];

        $.each(component.i18n || {}, function(k) {
            languages.push(k);
        });

        return languages;
    }
})

/**
 * get attributes in @attrs that its property name prefixes @prefix
 */
/*.factory('getAttributes', function() {
	function getAttributes(prefix, attrs) {

		var filtered_attrs = {},
			prefix_len = prefix.length;
		
		$.each(attrs, function(name, attr) {
			var index = name.indexOf(prefix);
			if (index !== 0) return;

			var prop_name = name.substr(prefix_len,1).toString().toLowerCase() + name.substr(prefix_len + 1);

			// parse attr to correct data type
			if (attr === 'true') {
				attr = true;
			} else if (attr === 'false') {
				attr = false;
			} else if ($.isNumeric(attr)) {
				attr = parseFloat(attr);
			}

			filtered_attrs[prop_name] = attr;
		});

		return filtered_attrs;
	}

	return function(prefix, attrs) {
		return getAttributes(prefix, attrs);
	}
})*/

.controller('AppController', ['$scope', 'getComponents', 'getScopes', 'mergeReferences', function($scope, getComponents, getScopes, mergeReferences) {

    $scope.Component = WYSIRWYG.Component;
    $scope.data = {
        components: null
    };

    $scope.Component.watch(null, function(data) {
        $scope.data.components = $.extend(true, $scope.data.components || {}, data.diff);
        mergeReferences($scope.data.components);
        $scope.$apply();
    });

    getComponents();

    console.log('para acessar $scope use a variavel global $scope, getScopes');
    window.$scope = $scope;
    window.getScopes = getScopes;

}]);