INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (
	1,
	'A normal component',
	NULL,
	'<div>
		<h1><i18n id="title"></i18n></h1><br>
		<p><i18n id="desc"></i18n></p>
		<p><i18n id="youhave"></i18n></p>
		<hr />
		{{data.apples}} - {{data.applesEatten}} = <b>{{data.apples - data.applesEatten}}</b>
	</div>',
	'{
		"apples": 5,
		"applesEatten": 1
	}',

	'{
		"&.some-theme": {

		},
		"&.another-theme": {

		}
	}',

	'{
		"en-us": {
			"title": "<u>Title {{1}}</u>",
			"desc": "You are using this component in: <b>{{$parent.language}}</b>, but i18n is: <b>{{language}}</b>.",
			"youhave": "You had {{data.apples}} apples, you ate {{data.applesEatten}}. How many apples left?"
		},

		"pt-br": {
			"title": "<u>Titulo {{1}}</u>",
			"desc": "Você está usando este componente no idioma: <b>{{$parent.language}}</b>, mas o i18n está em: <b>{{language}}</b>.",
			"youhave": "Você tem {{data.apples}} maças, comeu {{data.applesEatten}}. Quantas restam?"
		}
	}',
	NULL,
	NULL
);