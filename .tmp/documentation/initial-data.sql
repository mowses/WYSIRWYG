--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- Data for Name: components; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (1, 'A simple component', NULL, '<div>
		<h1><i18n id="title"></i18n></h1><br>
		<p><i18n id="desc"></i18n></p>
		<p><i18n id="youhave"></i18n></p>
		<hr />
		{{data.data.apples}} - {{data.data.applesEatten}} = <b>{{data.data.apples - data.data.applesEatten}}</b>
	</div>', '{
		"apples": 5,
		"applesEatten": 1
	}', '{
		"&.yellow": {
			"background": "yellow"
		},
		"&.green": {
			"background": "green"
		}
	}', '{
	"en-US": {
		"title": "<u>Title {{1}}</u>",
		"desc": "You are using this component in: <b>{{$parent.language}}</b>.",
		"youhave": "You have {{data.data.apples}} apples, you ate {{data.data.applesEatten}}. How many apples left?"
	},

	"pt-BR": {
		"title": "<u>Titulo {{1}}</u>",
		"desc": "Você está usando este componente no idioma: <b>{{$parent.language}}</b>.",
		"youhave": "Você tem {{data.data.apples}} maças, comeu {{data.data.applesEatten}}. Quantas restam?"
	}
}', NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (8, 'replaced', NULL, '<div>THIS IS NO MORE COMPONENT 1, because it was replaced by component 8</div>', NULL, '{
	"&.black": {
		"background": "black",
		"color": "white"
	}
}', NULL, NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (2, 'A component with subcomponent', NULL, '<div>
		<h1><i18n id="title"></i18n></h1>
		<p><i18n id="desc"></i18n></p>

		<component id="component-{{data.subcomponents[''mysub1''].subcomponent.id}}" data="data.subcomponents[''mysub1''].subcomponent" config="data.subcomponents[''mysub1''].config"></component>
		xxxxxxxxxxxxxx {{data.data.total}} xxxxxxxxxxxxxx
	</div>', '{
		"total": 1
	}', '{
		"&.pink": {
			"background": "pink"
		},
		"&.purple": {
			"background": "purple"
		}
	}', '{
		"en-US": {
			"title": "Subcomponents",
			"desc": "This is a component with a subcomponent."
		},

		"pt-BR": {
			"title": "Subcomponentes",
			"desc": "Este é um componente com subcomponente."
		}
	}', NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (5, 'Overriding component data of component #2', 2, NULL, '{
		"total": "A STRING HERE"
	}', '{
	"&.crimson": {
		"background": "crimson"
	},
	"&.OliveDrab1": {
		"background": "OliveDrab1"
	}
}', NULL, NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (3, 'A component with sub and sub...', NULL, '<div>
		<h1><i18n id="title"></i18n></h1>
		<p><i18n id="desc"></i18n></p>

		<component id="component-2" data="data.subcomponents[''mysub1''].subcomponent" class="pink"></component>
		<u ng-repeat="i in data.data.times" ng-bind="i + ''...''"></u>
	</div>', '{
		"times": [10,9,8,7,6,5,4,3,2,1,0,"end"]
	}', '{
		"&.gold": {
			"background": "gold"
		},
		"&.cyan": {
			"background": "cyan"
		}
	}', '{
		"en-US": {
			"title": "Component > sub > sub",
			"desc": "This is a component with a subcomponent that contains another component."
		},

		"pt-BR": {
			"title": "Componente > sub > sub",
			"desc": "Este é um componente com subcomponente que contem outro subcomponente.."
		}
	}', NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (6, 'Overriding component data of component #3', 3, '<div>
	<u ng-repeat="i in data.data.times" ng-bind="i + ''...''"></u>
	<component id="component-5" data="data.subcomponents[''mysub1''].subcomponent" class="crimson"></component>
	
	<p><i18n id="desc"></i18n></p>
	<h1><i18n id="title"></i18n></h1>

</div>', '{
		"times": ["start", 1,2,3,4,"...", "n"]
	}', '{
		"&.orange": {
			"background": "orange"
		},
		"&.black": {
			"background": "black",
			"color": "white"
		}
	}', NULL, NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (7, 'Replacing subcomponent from existing component', 3, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (9, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (4, 'Overriding component data of component #1', 1, NULL, '{
		"apples": 441,
		"applesEatten": 147
	}', NULL, '{
	"es-MX": {
		"title": "<u>El Título {{1}}</u>",
		"desc": "Ustere estàs usando el componiente en el idioma: <b>{{$parent.language}}</b>.",
		"youhave": "Ustere tienes {{data.data.apples}} maçañas, comieste {{data.data.applesEatten}}. Cuantas restam?"
	}
}', NULL, NULL);


--
-- Name: components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('components_id_seq', 7, true);


--
-- Data for Name: components_subcomponents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (2, 'mysub1', 3, 2, NULL);
INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (3, 'mysub1', 6, 5, NULL);
INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (4, 'mysub1', 5, 4, NULL);
INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (5, 'mysub1', 7, 9, NULL);
INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (1, 'mysub1', 2, 1, '{
	"class": "yellow"
}');
INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (6, 'mysub1', 9, 8, '{
	"class": "black"
}');


--
-- Name: components_subcomponents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('components_subcomponents_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

