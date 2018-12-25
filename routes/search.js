const fs = require('fs');

module.exports = {
    getSearchPage: (req, res) => {
        let queries = ["SELECT * FROM `movie` ORDER BY id ASC" // query database to get all the players
                      ,"SELECT DISTINCT `rating` FROM `movie` ORDER BY id ASC"
                      ,"SELECT DISTINCT `genre` FROM `movie` ORDER BY id ASC"];

         db.query(queries.join(';'), function (error, results, fields){
            if (error) {
                res.redirect('/');
            }
            let searchRating="";
            let searchGenre=""; 
            let searchvalue="";
            res.render('search.ejs', {
                title: "Welcome to Movie Database | Search Movies"
                ,movies: results[0]
                ,searchvalue:searchvalue
                ,searchGenre:searchGenre
                ,searchRating:searchRating
                ,ratingOptions:results[1]
                ,genreOptions : results[2]
            });
        });
    },
    Search: (req, res) => {
        let rating = req.body.rating;
        let genre = req.body.genre;
        let searchtext = req.body.searchbox;
        let str = "SELECT * FROM `movie` WHERE ";
            if(rating!=undefined && rating!=="Rating")
                 str=str+"`rating` ='"+ rating + "' AND ";

            if(genre!=undefined && genre!=="Genre")
                str=str+"`genre` = '" + genre + "' AND ";

             str=str+ " `name` LIKE '%" + searchtext + "%'"
 
         let queries = [ str
                        ,"SELECT DISTINCT `rating` FROM `movie` ORDER BY id ASC"
                        ,"SELECT DISTINCT `genre` FROM `movie` ORDER BY id ASC"];

        db.query(queries.join(';'), function (error, results, fields){
            if (error) {
                res.redirect('/');
            } 
            let searchvalue = searchtext;
            let searchRating= rating;
            let searchGenre= genre; 
            res.render('search.ejs', {
                title: "Welcome to Movie Database | Search Movies"
                ,movies: results[0]
                ,searchvalue:searchvalue
                ,searchGenre:searchGenre
                ,searchRating:searchRating
                ,ratingOptions : results[1]
                ,genreOptions : results[2]
            });
        });
    },
};
