'use strict';

angular.module('WYSIRWYG', [
    'WYSIRWYG.modules.Editor',
    'WYSIRWYG.modules.Editor.Raw'
])

.factory('getComponents', function() {

    return function(components, callback) {
        components = $.makeArray(components);

        $.get('/components/get', {
            components: components
        }, function(data) {
            callback ? callback(data) : null;
        });
    }
})

.factory('mergeReferences', function() {
    function mergeReferences(components, references) {
        $.each(components || [], function(i, component) {
            var k = component.name;

            mergeReferences(component.components, references);
            if (component.reference) {
                var reference = $.grep(references, function(ref) {
                    return (ref.name === component.reference);
                })[0];

                components[i] = $.extend(true, {}, reference, component);
            }
        });
    }

    return function(components) {
        return mergeReferences(components, components);
    }
})

/**
 * só um wrapper para agilizar o processo do desenvolvimento - remover getComponents abaixo e descomentar o de cima
 */
/*.factory('getComponents', function() {

	return function(callback) {
		//setTimeout(function() {
		var components = WYSIRWYG.Component.getData(),
			data = ([
      {
        "name": "ResultBox",
        "template": "<div><i18n id=\"query\"></i18n></div> <hr /> <!--{{data.data.searchData}} <hr/> --> <table border=\"1\" style=\"float:left; margin-right: 10px;\" ng-repeat=\"(kind, type) in data.data.searchData\"><caption class=\"id-12345\">{{kind}}</caption><tr><th>Name</th><th>Type</th></tr><tr ng-repeat=\"(i, item) in type | filter:data.data.query \"><td>{{item.name}}</td><td>{{item.type}}</td></tr><tr><td colspan=\"2\"><i18n id=\"result\"></i18n></td></tr></table><br clear=\"all\" />",
        "data": {
          "query": "",
          "searchData": {
            "music": [
              {
                "name": "Gammaray",
                "type": "Metal"
              },
              {
                "name": "Sabaton",
                "type": "Metal"
              },
              {
                "name": "Angra",
                "type": "Metal"
              }
            ]
          }
        },
        "i18n": {
          "pt-BR": {
            "query": "Sua pesquisa por <data id=\"query\"></data>",
            "result": "Retornou <b>{{(type | filter:data.data.query).length}}</b> resultados."
          }
        },
        "styles": {
          "&.theme-default": {
            "background": "yellow",
            "position": "absolute",
            "top": "0px",
            "right": "100px",
            "bottom": "10px",
            "left": "100px",

            ".id-12345": {
              "background": "red",
              "color": "green"
            }
          },

          "&.theme-algo": {
            "background": "blue",
            "position": "relative",
            "left": "20px",
            "top": "20px",
            "width": "200px",
            "color": "white",
            
            ".id-12345": {
              "background": "white",
              "color": "black"
            }
          }
        },
        "createdAt": "2015-03-21T17:06:22.188Z",
        "updatedAt": "2015-03-21T17:06:22.188Z"
      },
      {
        "name": "Searcher",
        "template": "<h1><i18n id=\"salutation\" language=\"pt-BR\"></h1> <h2><i18n id=\"introduction\" language=\"en-US\"></i18n></h2> <p><i18n id=\"description\"></i18n></p> <component id=\"Foolish\" data=\"data.components.Foolish\"></component>",
        "data": {
          "name": "Moisés mosele"
        },
        "i18n": {
          "pt-BR": {
            "salutation": "Olá <data id=\"name\"></data>",
            "introduction": "Esse é nosso primeiro exemplo.",
            "description": "Essa é a descrição. Note que não foi informado o idioma para este texto no template. Está exibindo o texto do idioma padrão do componente."
          },
          "en-US": {
            "salutation": "Hello <data id=\"name\"></data>",
            "introduction": "This is our components example.",
            "description": "This is the description. Note that was not passed the language attribute to this text in the template. It's showing the text from the default language of the component."
          }
        },
        "components": {
          "Foolish": {
            "name": "Foolish",
            "template": "<i18n id=\"currentLanguage\"></i18n> - <i18n id=\"searchFor\"></i18n> <input type=\"text\" name=\"foolish\" ng-click=\"controller.setTodayBirthDate()\" ng-blur=\"controller.setOldBirthDate()\" ng-keyup=\"controller.logInputText()\" ng-model=\"data.components.ResultBox.data.query\" /> {{data.data.birthday | date : 'dd/MM/yyyy'}} <component id=\"ResultBox\" data=\"data.components.ResultBox\"></component>",
            "data": {
              "birthday": "1986-01-13"
            },
            "i18n": {
              "en-US": {
                "currentLanguage": "Current Language is: {{language}}",
                "searchFor": "Search:"
              },
              "pt-BR": {
                "currentLanguage": "Idioma corrente é: {{language}}",
                "searchFor": "Localizar:"
              }
            },
            "components": {
              "ResultBox": {
                "reference": "ResultBox",
                "data": {
                  "searchData": {
                    "series": [
                      {
                        "name": "Two and a Half Men",
                        "type": "Comedy"
                      },
                      {
                        "name": "Walking Dead",
                        "type": "Zombie"
                      },
                      {
                        "name": "Game of Thrones",
                        "type": "Drama"
                      },
                      {
                        "name": "Bible",
                        "type": "Religious"
                      },
                      {
                        "name": "Breaking Bad",
                        "type": "Drama"
                      },
                      {
                        "name": "Generals at War",
                        "type": "Documentary"
                      },
                      {
                        "name": "History of Humanity",
                        "type": "Documentary"
                      },
                      {
                        "name": "The Prime Fields",
                        "type": "Documentary"
                      },
                      {
                        "name": "The Adventures of Robin Hood",
                        "type": "Cartoon"
                      },
                      {
                        "name": "Adventures of Sonic The Hedgehog",
                        "type": "Cartoon"
                      },
                      {
                        "name": "The Adventures of Jimmy Neutron: Boy Genius",
                        "type": "Cartoon"
                      },
                      {
                        "name": "The Adventures of Rin Tin Tin",
                        "type": "Cartoon"
                      },
                      {
                        "name": "The Adventures of Super Mario Bros. 3",
                        "type": "Cartoon"
                      },
                      {
                        "name": "Afro Samurai",
                        "type": "Cartoon"
                      },
                      {
                        "name": "Adventures of Superman",
                        "type": "TV Show"
                      },
                      {
                        "name": "ALF",
                        "type": "TV Show"
                      }
                    ],
                    "movies": [
                      {
                        "name": "Saving Private Ryan",
                        "type": "World War II"
                      },
                      {
                        "name": "Shrek",
                        "type": "Animation"
                      }
                    ]
                  }
                },
                "i18n": {
                  "pt-BR": {
                    "query": "SUA PEXQUISA POR:::: <data id=\"query\"></data>"
                  }
                }
              }
            }
          }
        },
        "styles": {
          "&.theme-default": {
            "position": "absolute",

            "input": {
              "background": "crimson"
            }
          },

          "&.theme-1": {
            "background": "yellow",

            "input": {
              "background": "pink",
              "border": "3px dashed grey",
              "border-bottom": "5px solid black"
            }
          }
        },
        "createdAt": "2015-03-21T17:06:34.418Z",
        "updatedAt": "2015-03-21T17:06:34.418Z"
      }
    ]);

	$.each(data, function(i, component) {
			components[component.name] = component;
		});

			callback ? callback(data) : null;

		//}, 2000);
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

        $.each(component.styles, function(k) {
            if (k.substr(0, 2) != '&.') return;

            var theme_name = k.substr(2);

            themes.push(theme_name);
        });

        return themes;
    }
})

/*.factory('mergeReferences', function() {
    function mergeReferences(components, path) {
        $.each(components || [], function(k, component) {
            var _path = !path ? k : path + '.components.' + k;
            mergeReferences(component.components, _path);
            if (component.reference) {
                $.extend(true, component, WYSIRWYG.Component.getData(component.reference), WYSIRWYG.Component.getData(_path));
            }
        });
    }

    return function(components, path) {
        return mergeReferences(components, path);
    }
})*/

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