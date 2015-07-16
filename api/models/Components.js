/**
 * Components.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	autoPK: false,

	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			unique: true,
			foreignKey: true,
			autoIncrement: true
		},

		name: {
			type: 'string',
			required: true,
			minLength: 5,
			maxLength: 255
		},

		prototypeFrom: {
			model: 'components',
			required: false
		},

		template: {
			type: 'text',
			required: false
		},

		data: {
			type: 'json',
			required: false
		},

		styles: {
			type: 'json',
			required: false
		},

		i18n: {
			type: 'json',
			required: false
		},

		component: {
			collection: 'components',
			via: 'subcomponents'
		},

		subcomponents: {
			collection: 'components',
			via: 'component'
		}
	}
};