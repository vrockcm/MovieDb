const fs = require('fs');

module.exports = {
    addDirectorPage: (req, res) => {
        res.render('add-director.ejs', {
            title: "Welcome to Movie Database | Add a new director"
            ,message: ''
        });
    },
    addDirector: (req, res) => {

        let message = '';
        let name = req.body.name;
        let birth = req.body.birth;
        let award = req.body.award;
		/*let id = req.body.id;*/
		/*
        let actorIdQuery = "SELECT * FROM `actor` WHERE id = " + id;

        db.query(actorIdQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Error, ID already exists';
                res.render('add-player.ejs', {
                    message,
                    title: "Welcome to Movie Database | Add a new actor"
                });
            } else {
                // check the filetype before uploading it
				*/
 
                        // send the player's details to the database
                        let query = "INSERT INTO `director` (name,birth,award) VALUES ('" +
                            name + "', '" + birth + "', '" + award + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
              
                },
				/*
        });
    },*/
    editDirectorPage: (req, res) => {
        let directorId = req.params.id;
        let query = "SELECT * FROM `director` WHERE id = '" + directorId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-director.ejs', {
                title: "Edit Director"
                ,director: result[0]
                ,message: ''
            });
        });
    },
    editDirector: (req, res) => {
        let directorId = req.params.id;
        let name = req.body.name;
        let birth = req.body.birth;
        let award = req.body.award;
		let query = "UPDATE `director` SET `name` = '" + name + "', `birth` = '" + birth + "', `award` = '" + award + "' WHERE id =" + directorId;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteDirector: (req, res) => {
        let directorId = req.params.id;
        let deleteUserQuery = 'DELETE FROM director WHERE id = "' + directorId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
