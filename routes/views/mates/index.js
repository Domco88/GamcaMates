var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'presentations';
	locals.data = {
		presentations: []
	};

	// Load all presentations
	view.on('init', function (next) {

		keystone.list('Presentation').model.find().sort('timeStart').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.presentations = results;

			// Load the counts for each presentation
			async.each(locals.data.presentations, function (presentation, next) {

				keystone.list('Question').model.count().where({'presentation': presentation}).exec(function (err, count) {
					presentation.questionCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Render the view
	view.render('sys/presentations', {layout: 'presentationLayout.hbs'});
};
