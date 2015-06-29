/**
 * Components.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	autoPK: false,
	attributes: {
		name: {
			type: 'string',
			required: true,
			unique: true,
			primaryKey: true,
			alphanumeric: true,
			minLength: 5,
			maxLength: 255
		},

		template: {
			type: 'text',
			required: true
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
			required: true
		},

		components: {
			type: 'json',
			required: false
		}
	}
};