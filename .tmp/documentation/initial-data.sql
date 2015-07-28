INSERT INTO components (id, name, "prototypeFrom", template, data, styles, i18n, "createdAt", "updatedAt") VALUES (
	1,
	'A normal component',
	NULL,
	'<div>
		<h1 ng-bind="i18n.title"></h1>
		<p ng-bind="i18n.desc"></p>
		<p ng-bind="i18n.youhave"></p>
		<hr />
		{{data.apples}} + {{data.applesEatten}} = <b>{{data.apples - data.applesEatten}}</b>
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
		"pt-br": {
			"title": "Titulo",
			"desc": "Lorem ipsum dolor sit amet.",
			"youhave": "Você tem {{data.apples}} maças, comeu {{data.applesEatten}}. Quantas restam?"
		}
	}',
	NULL,
	NULL
);