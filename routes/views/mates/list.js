var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'presentation';
	locals.filters = {
		presentation: req.params.presentation,
	};
	locals.data = {
		questions: [],
	};

	// Load the current presentation
	view.on('init', function (next) {

		var q = keystone.list('Presentation').model.findOne({
			slug: locals.filters.presentation,
		});

		q.exec(function (err, result) {
			locals.data.presentation = result;
			next(err);
		});

	});

	// Load questions
	view.on('init', function (next) {

		var q = keystone.list('Question').model.find().where('presentation', locals.data.presentation).sort('shortcut');

		q.exec(function (err, results) {
			locals.data.questions = results;
			next(err);
		});

	});

	// Render the view
	view.render('sys/presentation', {layout: 'presentationLayout.hbs'});
};
