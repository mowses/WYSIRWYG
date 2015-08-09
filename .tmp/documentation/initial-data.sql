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
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (4, 'Overriding component data (prototyped from component 3)', 3, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (2, 'A component with subcomponent', NULL, '<div>
		<h1><i18n id="title"></i18n></h1>
		<p><i18n id="desc"></i18n></p>

		<component id="component-1" data="data.subcomponents[''mysub1''].subcomponent" class="pink"></component>
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
INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (5, 'Overrind i18n', 3, NULL, NULL, NULL, '{
		"en-US": {
			"title": "OVERRIDE Component > sub > sub",
			"desc": "OVERRIDE This is a component with a subcomponent that contains another component."
		},

		"pt-BR": {
			"title": "OVERRIDE Componente > sub > sub",
			"desc": "OVERRIDE Este é um componente com subcomponente que contem outro subcomponente.."
		}
	}', NULL, NULL);


--
-- Name: components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('components_id_seq', 7, true);


--
-- Data for Name: components_subcomponents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (1, 'mysub1', 2, 1, NULL);
INSERT INTO components_subcomponents (id, name, component, subcomponent, config) VALUES (2, 'mysub1', 3, 2, NULL);


--
-- Name: components_subcomponents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('components_subcomponents_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

