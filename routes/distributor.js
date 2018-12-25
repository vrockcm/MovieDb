const fs = require('fs');

module.exports = {
    addDistributorPage: (req, res) => {
        res.render('add-distributor.ejs', {
            title: "Welcome to Movie Database | Add a new distributor"
            ,message: ''
        });
    },
    addDistributor: (req, res) => {

        let message = '';
        let name = req.body.name;
		let loc = req.body.loc;
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
                        let query = "INSERT INTO `distributor` (name,location) VALUES ('" +
                            name + "','" + loc + "')";
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
    editDistributorPage: (req, res) => {
        let distributorId = req.params.id;
        let query = "SELECT * FROM `distributor` WHERE id = '" + distributorId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-distributor.ejs', {
                title: "Edit Distributor"
                ,distributor: result[0]
                ,message: ''
            });
        });
    },
    editDistributor: (req, res) => {
        let distributorId = req.params.id;
        let name = req.body.name;
		let loc = req.body.loc;
		let query = "UPDATE `distributor` SET `name` = '" + name + "',`location` = '" + loc + "' WHERE id =" +distributorId;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteDistributor: (req, res) => {
        let distributorId = req.params.id;
        let deleteUserQuery = 'DELETE FROM distributor WHERE id = "' + distributorId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
