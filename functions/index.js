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
app.get("/get_timetable/:userId",async (req,res,next)=>{
    try{
        var timetable_data=[];
        db.collection("groups").doc(req.params.userId).collection(time-schedule).get().then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                timetable_data.push({
                    id:doc.id,
                    data:doc.data()
                });
            });
        res.json(timetable_data);
        });
    }
    catch(e){
        next(e);
    }
});

app.get("/get_task/:userId", async (req,res,next)=>{
    try{
        var task_data=[];
        db.collection("groups").doc(req.params.userId).collection(homework).get().then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                task_data.push({
                    id:doc.id,
                    data:doc.data()
                });
            });
        res.json(task_data);
        });
    }
    catch(e){
        next(e);
    }
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
module.exports={api};