var keystone = require('keystone');
var Types = keystone.Field.Types;




var Mate = new keystone.List('Mate', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
});

Mate.add({
	name: { type: Types.Name, index: true },
});


/**
 * Registration
 */
Mate.defaultColumns = 'name';
Mate.register();
