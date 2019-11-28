var express = require('express');
var app = express();


app.use(express.urlencoded());
app.use(express.json());


app.get('/getstudents', function (req, res) {
   
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database:"niner_eats"
    });


    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM student", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
          res.send(result);
      });
    });    
    
});


app.post('/poststudents', function (req, res) {
    
    var mysql = require('mysql');
    console.log(req);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database:"niner_eats"
    });

    var person_query="INSERT INTO person (person_name, person_email,cell) VALUES ?";
    var person_val=[[req.body.name,req.body.email,req.body.cell]];
    var student_query="INSERT INTO student (person_id, graduation_year,major,type) VALUES ?";

    con.connect(function(err) {
      if (err) throw err;
      con.query(person_query,[person_val], function (err, result, fields) {
        if (err) throw err;
        console.log(result.insertId);
        var stuent_val=[[result.insertId,req.body.graduation_year,req.body.major,req.body.type]];
        con.query(student_query,[stuent_val], function (err, result, fields) {
        if (err) throw err;
        console.log(result.insertId);   
        res.send("Created")
      });
          
      });
    });    
    
});

app.delete('/deletetudent', function (req, res) {
    
    var mysql = require('mysql');
    console.log(req);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database:"niner_eats"
    });

    var query="DELETE FROM student WHERE student_id = ?";
    var val=req.body.student_id;

    con.connect(function(err) {
      if (err) throw err;
      con.query(query,[val], function (err, result, fields) {
        if (err) {
             res.send(err);
            throw err;
                }
        else{  
        console.log(result);
        res.send("Delete Successful")
        }
      });
    });    
    
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
