/**
 * Components_subcomponents.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	autoPK: false,
	autoCreatedAt: false,
	autoUpdatedAt: false,

	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			unique: true,
			autoIncrement: true
		},

		name: {
			type: 'string',
			required: true,
			maxLength: 255
		},

		component: {
			model: 'components',
			required: true
		},

		subcomponent: {
			model: 'components',
			required: true
		},

		config: {
			type: 'json',
			required: true
		}
	}
};