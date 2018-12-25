const fs = require('fs');

const mysql = require('mysql');
const db = mysql.createConnection ({
	multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '305_project'
});


module.exports = {
    addMoviePage: (req, res, next) => {
		var queries=["SELECT * FROM `actor` ORDER BY id ASC","SELECT * FROM `director` ORDER BY id ASC",
		"SELECT * FROM `producer` ORDER BY id ASC","SELECT * FROM `distributor` ORDER BY id ASC"]
		db.query(queries.join(';'), function (error, results, fields) {
			if (error) throw error;
		res.render('add-movie.ejs', {
			title: "Add Movie",
			actor: results[0], // First query from array
			director: results[1],   // Second query from array
			producer: results[2],
			distributor: results[3],
			message:''
		});
		
	});
},
addMovie: (req, res, next) => {

        let message = '';
        let name = req.body.name;
		let rating = req.body.rating;
		if (rating == undefined || rating == ''){
			rating = "NULL";
		}
		else{
			rating = "'" + rating + "'"
		}
		let released = req.body.released;
		let duration = req.body.duration;
		if (duration == undefined || duration == ''){
			duration = "NULL";
		}
		let genre = req.body.genre;
		if (genre == undefined || genre == ''){
			genre = "NULL";
		}
		else{
			genre = "'" + genre + "'"
		}
		let director = req.body.director;
		if (director == undefined || director == ''){
			director = "NULL";
		}
		let producer = req.body.producer;
		if (producer == undefined || producer == ''){
			producer = "NULL";
		}
		let cast = req.body.cast;
		if (cast == undefined || cast == ''){
			cast = "NULL";
		}
		else{
			cast = "'" + cast + "'"
		}
		
		
		
        let query = "INSERT INTO `movie` (name,rating,released,duration,genre,director,producer,cast) VALUES ('" +
                            name + "'," 
							+ rating + ",'" 
							+ released + "'," 
							+ duration + "," 
							+ genre + ","
							+ director + ","
							+ producer + ","
							+ cast + ")";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
							res.redirect('/');
				
		});
    },
    editMoviePage: (req, res) => {
        let movieId = req.params.id;
		var queries=["SELECT * FROM `actor` ORDER BY id ASC","SELECT * FROM `director` ORDER BY id ASC",
		"SELECT * FROM `producer` ORDER BY id ASC","SELECT * FROM `distributor` ORDER BY id ASC"]
		db.query(queries.join(';'), function (error, results, fields) {
			if (error) throw error;
		res.render('edit-movie.ejs', {
			title: "Edit Movie",
			actor: results[0], // First query from array
			director: results[1],   // Second query from array
			producer: results[2],
			distributor: results[3],
			message:''
		});
		
	});	/*
        let query = "SELECT * FROM `movie` WHERE id = '" + movieId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-movie.ejs', {
                title: "Edit Movie"
                ,movie: result[0]
                ,message: ''
            });
        });*/
    },
	
    editMovie: (req, res) => {
        let movieId = req.params.id;
        let name = req.body.name;
		let rating = req.body.rating;
		if (rating == undefined || rating == ''){
			rating = "NULL";
		}
		else{
			rating = "'" + rating + "'"
		}
		let released = req.body.released;
		let duration = req.body.duration;
		if (duration == undefined || duration == ''){
			duration = "NULL";
		}
		let genre = req.body.genre;
		if (genre == undefined || genre == ''){
			genre = "NULL";
		}
		else{
			genre = "'" + genre + "'"
		}
		let director = req.body.director;
		if (director == undefined || director == ''){
			director = "NULL";
		}
		let producer = req.body.producer;
		if (producer == undefined || producer == ''){
			producer = "NULL";
		}
		let cast = req.body.cast;
		if (cast == undefined || cast == ''){
			cast = "NULL";
		}
		else{
			cast = "'" + cast + "'"
		}
		let query = "UPDATE `movie` SET `name` = '" + name + "',`rating` = " + rating + ",`released` = '" + released 
		+ "',`duration` = " + duration + ",`genre` = " + genre + ", `director` = " + director 
		+ ", `producer` = " + producer + ", `cast` =" + cast + " WHERE id = " + movieId;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteMovie: (req, res) => {
        let movieId = req.params.id;
        let deleteUserQuery = 'DELETE FROM movie WHERE id = "' + movieId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};

