var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongodb");
var crypto = require('crypto');
var app = express();
var new_db = "mongodb://localhost:27017/mydb";
var MongoClient = require('mongodb').MongoClient;
var flag = false;
//let MyUser = "Efrat";
var cals;
//build default express server

//get home page

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', function (req, res) {
    res.render('pages/index');
})

// Sign-up function starts here. . .
app.get('/sign_up', function (req, res) {
    console.log(req.query);
    MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
        var myobj = { name: req.query.name, email: req.query.email, password: req.query.password, phone: req.query.phone, weight: req.query.weight, height: req.query.height };
    dbo.collection("customers").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 user inserted");
        db.close();
    });

      
    });
    res.render('pages/myZone', { user: req.query.name});

});

app.get('/update', function (req, res) {
    console.log(req.query);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var uname = req.query.name;
        var myobj = {email: req.query.email, password: req.query.password, phone: req.query.phone, weight: req.query.weight, height: req.query.height };
        dbo.collection("customers").update({ name: uname }, { $set: myobj});
      
        });

    res.redirect('update');

});


app.post('/UpdateWeight', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var newWeight = req.body.NW;
        dbo.collection("customers").update({ username: "Efrat" }, { $set: { weight: newWeight } });
            
        });
    });

app.get('/log_in', function (req, res) {
    console.log(req.query);
   
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = {"name" : req.query.name};
        dbo.collection("customers").findOne(myobj, function (err, res1) {
            if (err) throw err;
            console.log("Record inserted successfully");
            if (res1)
                flag=true;
            db.close();
        });
        });
    if(flag)
        res.render('pages/myZone', { user: req.query.name });
    else
        res.redirect('/LogIn.html');

});

// log-in function starts here. . .
/*app.post('/log_in', async (req, res) =>{
    var user = JSON.parse(req.params.data);
    var name = user.name;
    var pass = user.password;
    var password = getHash(pass, name);
    console.log(name);

    var data = {
        "name": name,
        "password": password
    }

    var db = await mongo.connect(new_db);
    console.log("connected to database successfully!!!!!");
        //CREATING A COLLECTION IN MONGODB USING NODE.JS
    let result= await db.collection("customers").findOne(data)
    if (result == null)
        console.log("no user");
    //console.log("DATA is " + JSON.stringify(data));
    res.render('pages/myZone');

*/
app.set('view engine', 'ejs');


var url = "mongodb://localhost:27017/mydb";
var url1 = "mongodb://localhost:27017/";
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
app.get('/TodayMeal', function (req, res) {
    res.render('pages/TodayMeal');
});
app.get('/myGoals', function (req, res) {
    res.render('pages/myGoals');
});
app.get('/signUp.html', function (req, res) {
    res.redirect('signUp');
});
app.get('/myZone', function (req, res) {
   
    //res.send(jso);
    res.render('pages/myZone');

});
app.get('/LogIn.html', function (req, res) {
    res.redirect('LogIn');
});
/*app.post('/log_in', function (req, res) {
    MongoClient.connect(url1, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { Uname: req.query.name };
        dbo.collection("costumers").findOne(query).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            if (result.length) {
                console.log("user found:");
                alert('user found!');
            }
            else
                console.log("user not  found");
            db.close();
            MyUser = result[0];
            res.render('inmotion-colorlib/inmotion/generic', {
                myuser: MyUser
            });

        });

    });
});
*/
app.get('/AddMeal', function (req, res) {
    console.log(req.query);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { date: req.query.someDay, cal: req.query.srcURI1, carbs: req.query.srcURI2, sugar: req.query.srcURI3, lipid: req.query.srcURI4};
        dbo.collection("addmeal").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 meal inserted");
            db.close();
        });
        
        res.redirect('/TodayMeal');
    });

    //Window.location.href = "https://localhost:3000";
});
app.get('/AddGoal', function (req, res) {
    console.log(req.query);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { date: req.query.someDay, cal: req.query.srcURI1, carbs: req.query.srcURI2, sugar: req.query.srcURI3, lipid: req.query.srcURI4 };
        dbo.collection("addgoal").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 meal inserted");
            db.close();
        });

        res.redirect('/myGoals');
    });
});
//
app.get('/updateDetails', function (req, res) {
    console.log(req.query);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: req.query.name, email: req.query.email, password: req.query.password, phone: req.query.phone };
        dbo.collection("customers").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 user inserted");
            db.close();
        });


    });
    res.render('pages/myZone', { user: req.query.name });

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000 !!!!!');
})
 