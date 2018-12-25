const fs = require('fs');

module.exports = {
    addProducerPage: (req, res) => {
        res.render('add-producer.ejs', {
            title: "Welcome to Movie Database | Add a new producer"
            ,message: ''
        });
    },
    addProducer: (req, res) => {

        let message = '';
        let name = req.body.name;
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
                        let query = "INSERT INTO `producer` (name) VALUES ('" +
                            name + "')";
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
    editProducerPage: (req, res) => {
        let producerId = req.params.id;
        let query = "SELECT * FROM `producer` WHERE id = '" + producerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-producer.ejs', {
                title: "Edit Producer"
                ,producer: result[0]
                ,message: ''
            });
        });
    },
    editProducer: (req, res) => {
        let producerId = req.params.id;
        let name = req.body.name;
		let query = "UPDATE `producer` SET `name` = '" + name + "' WHERE id =" + producerId;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProducer: (req, res) => {
        let producerId = req.params.id;
        let deleteUserQuery = 'DELETE FROM producer WHERE id = "' + producerId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
