var router = require('express').Router();
var mysql = require('mysql');

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
    port: process.env.DB_PORT
});

router.get("/topic/add", (req, res) => {
    var q = "SELECT * FROM topic";
    db.query(q, (err, result) => {
        if(!err) {
            console.log(result);
            res.render('index', {
                data : result
            });
        } else {
            console.log(err);
        }
    });  
});

router.post("/topic/add", (req, res) => {
    var args = [req.body.title, req.body.description, req.body.author];
    var q = "INSERT INTO topic(title, description, author) VALUES(?, ?, ?)";
    db.query(q, args, (err, result) => {
        if(!err) {
            res.redirect('add');
        } else {
            console.log(err);
        }
        
    });
});

router.get(['/topic','/topic/:id'], (req, res) => {

    var sql = "SELECT * FROM topic";
    db.query(sql, (err, results) => {
        var id = req.params.id;
        if(id) {
            var sql2 = 'SELECT * FROM topic WHERE id=?';
            db.query(sql2, [id], (err, result) => {
                if(!err) {
                    res.render('view', {topic: result});
                } else {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
            });
        } else {
            res.render('view', {topic: results});
        }
    });
    // var id = req.params.id
    // var sql = `SELECT * FROM topic WHERE id=?`;
    // db.query(sql, [id], (err, result) => {
    //     if(!err) {
    //         console.log(result);
    //         res.render('view', {topic: result});
    //     } else {
    //         console.log(err);
    //     }
    // });
})

router.post('/topic/:id/modify', (req, res) => {
    var id = req.params.id;
    var sql = `SELECT * FROM topic WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if(!err) {
            res.render('modify', {
                data: result
            });
        } else {
            console.log(err);
        }
    });
});

router.post('/topic/:id/modify/ok', (req, res) => {
    var args = [req.body.title, req.body.description, req.body.author, req.params.id];
    var q = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
    db.query(q, args, (err, result) => {
        if(!err) {
            res.redirect('/topic/add');
        } else {
            console.log(err);
        }
    });
});

router.post('/topic/:id/delete', (req, res) => {
    var q = 'DELETE FROM topic WHERE id=?';
    db.query(q, [req.params.id], (err, result) => {
        if(!err) {
            res.redirect('/topic/add'); 
        } else {
            console.log(err);
        }
    });
});
module.exports = router;