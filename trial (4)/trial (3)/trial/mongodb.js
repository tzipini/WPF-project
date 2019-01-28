var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongodb");
var crypto = require('crypto');
var app = express();
var new_db = "mongodb://localhost:27017/mydb";
var MongoClient = require('mongodb').MongoClient;

function fillChart() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var dates=dbo.collection("addmeal").find({}).toArray;
        labels: [JSON.parse(dates[0]).date, JSON.parse(dates[1]).date, JSON.parse(dates[2]).date, JSON.parse(dates[3]).date, JSON.parse(dates[4]).date, JSON.parse(dates[5]).date, JSON.parse(dates[6]).date],
}
