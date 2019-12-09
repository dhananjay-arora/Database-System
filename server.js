var express = require('express');
var app = express();


app.use(express.urlencoded());
app.use(express.json());

//app.use(function (req, res, next) {
//
//    // Website you wish to allow to connect
//    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//
//    // Request methods you wish to allow
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//    // Request headers you wish to allow
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//    // Set to true if you need the website to include cookies in the requests sent
//    // to the API (e.g. in case you use sessions)
//    res.setHeader('Access-Control-Allow-Credentials', true);
//
//    // Pass to next layer of middleware
//    next();
//});

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));

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
      con.query("SELECT * FROM student s JOIN person p ON s.person_id=p.person_id", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
          res.send(result);
      });
    });    
    
});

app.post('/getonestudent', function (req, res) {
    
    var mysql = require('mysql');
    console.log(req);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database:"niner_eats"
    });
    
    var query="SELECT * FROM student s JOIN person p ON s.person_id=p.person_id WHERE student_id = ?";
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
        res.send(result)
        }
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
    var person_val=[[req.body.person_name,req.body.person_email,req.body.cell]];
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

app.put('/updatestudent', function (req, res) {
    
    var mysql = require('mysql');
    console.log(req);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database:"niner_eats"
    });

    var person_query="UPDATE person SET person_name=?,person_email=?,cell=? WHERE person_id=?";
    var student_query="UPDATE student SET graduation_year=?,major=?,type=? WHERE student_id=?";


    con.connect(function(err) {
      if (err) throw err;
      con.query(person_query,[req.body.person_name,req.body.person_email,req.body.cell,req.body.person_id], function (err, result, fields) {
        if (err) throw err;
        con.query(student_query,[req.body.graduation_year,req.body.major, req.body.type,req.body.student_id],function (err, result, fields) {
        if (err) throw err;
        res.send("Updated")
      });
          
      });
    });    
    
});



app.post('/deletestudent', function (req, res) {
    
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
