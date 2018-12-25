module.exports = {
    getHomePage: (req, res, next) => {
		
		var queries=["SELECT * FROM `actor` ORDER BY id ASC","SELECT * FROM `director` ORDER BY id ASC",
		"SELECT * FROM `producer` ORDER BY id ASC","SELECT * FROM `distributor` ORDER BY id ASC",
		"SELECT * FROM `movie` ORDER BY id ASC"]
		/*
        let actorQuery = "SELECT * FROM `actor` ORDER BY id ASC"; // query database to get all the players
		let directorQuery = "SELECT * FROM `director` ORDER BY id ASC";
		*/
        // execute query
		/*
        db.query(actorQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Movie Database | View Actors"
                ,actor: results[0]
            });
        });
		*/
	db.query(queries.join(';'), function (error, results, fields) {

		if (error) throw error;

		res.render('index.ejs', {
			title: "Welcome to Movie Database | View Database",
			actor: results[0], // First query from array
			director: results[1],   // Second query from array
			producer: results[2],
			distributor: results[3],
			movie: results[4]
		});
		
	});
}
}