const fs = require('fs');

module.exports = {
    getSearchDirectorPage: (req, res) => {
        let queries = ["SELECT * FROM `movie` ORDER BY id ASC" // query database to get all the players
                      ,"SELECT DISTINCT `id`,`name` FROM `producer` WHERE id IN (SELECT `producer` FROM `movie`)"
                      ,"SELECT DISTINCT `id`,`name` FROM `director` WHERE id IN (SELECT `director` FROM `movie`)ORDER BY id ASC"];

         db.query(queries.join(';'), function (error, results, fields){
            if (error) {
                res.redirect('/');
            }
            let searchProducer="";
            let searchDirector=""; 
            let searchvalue="";
            res.render('searchDirector.ejs', {
                title: "Welcome to Movie Database | Search By Producer and Director"
                ,movies: results[0]
                ,searchvalue:searchvalue
                ,searchDirector:searchDirector
                ,searchProducer:searchProducer
                ,producerOptions:results[1]
                ,directorOptions : results[2]
            });
        });
    },
    SearchDirector: (req, res) => {
        let producer = req.body.producer;
        let director = req.body.director;
        let searchtext = req.body.searchbox;
        let str = "SELECT * FROM `movie` WHERE ";
            if(producer!= undefined && producer!=="Producer")
                 str=str+"`producer` ="+ producer + " AND ";

            if(director!=undefined && director!=="Director")
                str=str+"`director` = '" + director + "' AND ";

             str=str+ " `name` LIKE '%" + searchtext + "%'"
   
         let queries = [ str
                        ,"SELECT DISTINCT `id`,`name` FROM `producer` WHERE id IN (SELECT `producer` FROM `movie`)"
                        ,"SELECT DISTINCT `id`,`name` FROM `director` WHERE id IN (SELECT `director` FROM `movie`)"];

        db.query(queries.join(';'), function (error, results, fields){
            if (error) {
                res.redirect('/');
            } 
            let searchvalue = searchtext;
            let searchProducer = producer;
            let searchDirector= director; 
            res.render('searchDirector.ejs', {
                title: "Welcome to Movie Database | Search by Producer and Director"
                ,movies: results[0]
                ,searchvalue:searchvalue
                ,searchDirector:searchDirector
                ,searchProducer:searchProducer
                ,producerOptions : results[1]
                ,directorOptions : results[2]
            });
        });
    },
};
