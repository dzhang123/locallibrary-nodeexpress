var validator = require('express-validator');
var Genre = require('../models/genre');

// Display list of all Genre.
exports.genre_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre list');
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
    res.render('genre_form', {title: 'Create Genre'});
};

// Handle Genre create on POST.
exports.genre_create_post = [
    validator.body('name', 'Genre name required').isLength({min: 1}).trim(),
    validator.sanitizeBody('name').escape(),

    (req, res, next) => {
        const errors = validator.validationResult(req);
        var genre = new Genre({name: req.body.name});

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
        }
        else {
            // Data from form is valid. check if Genre with the same name already exists.
            Genre.findOne({'name': req.body.name})
                .exec( (err, found_genre) => {
                    if (err) {return next(err);}
                    if (found_genre) {
                        res.redirect(found_genre.url);
                    } else {
                        genre.save( (err) => {
                            if (err) { return next(err);}
                            res.redirect(genre.url);
                        })
                    }
                });
        }
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};