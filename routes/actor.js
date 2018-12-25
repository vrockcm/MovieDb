const fs = require('fs');

module.exports = {
    addActorPage: (req, res) => {
        res.render('add-actor.ejs', {
            title: "Welcome to Movie Database | Add a new actor"
            ,message: ''
        });
    },
    addActor: (req, res) => {

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
                        let query = "INSERT INTO `actor` (name,birth,award) VALUES ('" +
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
    editActorPage: (req, res) => {
        let actorId = req.params.id;
        let query = "SELECT * FROM `actor` WHERE id = '" + actorId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-actor.ejs', {
                title: "Edit  Actor"
                ,actor: result[0]
                ,message: ''
            });
        });
    },
    editActor: (req, res) => {
        let actorId = req.params.id;
        let name = req.body.name;
        let birth = req.body.birth;
        let award = req.body.award;
		let query = "UPDATE `actor` SET `name` = '" + name + "', `birth` = '" + birth + "', `award` = '" + award + "' WHERE id =" + actorId;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteActor: (req, res) => {
        let actorId = req.params.id;
        let deleteUserQuery = 'DELETE FROM actor WHERE id = "' + actorId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
