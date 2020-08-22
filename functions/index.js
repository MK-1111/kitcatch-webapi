const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');

const app =express();
app.use(cors({origin: true}));

admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
var db=admin.firestore();
/*

app.get("/get_uuid/",(req,res,next)=>{
    res.send();
});
*/
app.get("/get_timetable/:userId",(req,res,next)=>{
    const timetable=db.collection("groups").doc(req.params.userId).collection(time-schedule); 
    res.json(timetable);
});

app.get("/get_task/:userId",(req,res,next)=>{
    const task=db.collection("groups").doc(req.params.userId).collection(homework);  
    res.send(task);
});

/*
app.post("/post_timetable/:userId",(req,res,next)=>{
    const 
    res.send();
});

app.post("/post_task/:userId",(req,res,next)=>{
    const 
    res.send();
});
*/
const api=functions.https.onRequest(app);
module.export={api};