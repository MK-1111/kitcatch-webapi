const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');

const app =express();
app.use(cors({origin: true}));

var serviceAccount = require("/home/star333/kitcatch/functions/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://friendlychat-1b9cf.firebaseio.com"
});

var db=admin.firestore();
/*

app.get("/get_uuid/",(req,res,next)=>{
    res.send();
});
*/
app.get("/get_timetable/:userId",async (req,res,next)=>{
    try{
        var timetable_data=[];
        db.collection("groups").doc(req.params.userId).collection("time-schedule").get()
        .then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                timetable_data.push({
                    id:doc.id,
                    ...doc.data().timestamp.toDate()
                });
            });
        res.json(timetable_data);
        });
    }
    catch(error){
        next(error);
    }
});

app.get("/get_task/:userId", async (req,res,next)=>{
    try{
        var task_data=[];
        db.collection("groups").doc(req.params.userId).collection("homework").get()
        .then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                task_data.push({
                    id:doc.id,
                    ...doc.data()
                });
            });
        res.json(task_data);
        });
    }
    catch(error){
        next(error);
    }
});

/*
app.post("/post_timetable/:userId",(req,res,next)=>{
    const newData = req.body;
    var docRef = db.collection("groups").doc(req.params.userId).collection("time-schedule").doc(newData.day);
    docRef
    res.send();
});
*/
app.post("/post_task/",(req,res,next)=>{
    const newData = req.body;
    const newDuedate=admin.firebase.firestore.Timestamp.fromDate(new Date(newData.due_date));
    db.collection("groups").doc(newData.userId).collection("homework").doc(newData.name)
    .set({
        class_name:newData.class_name,
        due_date:newDuedate,
        task_name:newData.task_name
    }).then(function(){
        res.send("success");
    })
    .catch(function(error){
        next(error);
    });
});
const api=functions.region("asia-northeast1").https.onRequest(app);
module.exports={api};