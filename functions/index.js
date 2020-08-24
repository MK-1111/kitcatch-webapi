const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');

const app =express();
app.use(cors({origin: true}));

//var serviceAccount = require("/home/star333/kitcatch/functions/serviceAccountKey.json");

admin.initializeApp();

var db=admin.firestore();

app.post("/update_uuid",async (req,res,next)=>{
    try{
    const newUUid=req.body;
    db.collection("users").doc(req.body.userId).update({
        uuid:newUUid.uuid
    })
    .then(function(){
        res.send("success");
    })
    .catch(function(error){
        res.send(error);
    });
}
catch(e){
    next(e);
}
});

app.get("/get_timetable/:userId",async (req,res,next)=>{
    try{
        const timetableRef = await db.collection("users").doc(req.params.userId).get();
        if(timetableRef.exists){
            res.send(timetableRef.get("timetable"));
        }else{
            res.send("timetable does not exist.");
        }
    }
    catch(error){
        next(error);
    }
});

app.get("/get_task/:userId", async (req,res,next)=>{
    try{
        const taskRef = await db.collection("users").doc(req.params.userId).get();
        if(taskRef.exists){
            res.send(taskRef.get("task"));
        }else{
            res.send("task does not exist.");
        }
    }
    catch(error){
        next(error);
    }
});


app.post("/post_timetable",(req,res,next)=>{
    const newData = req.body;
    db.collection("users").doc(newData.userId)
    .update({timetable:newData.timetable})
    .then(function(){
        res.send("success");
    })
    .catch(function(error){
        res.send(error);
    });
});

app.post("/post_task",(req,res,next)=>{
    const newData = req.body;
    db.collection("users").doc(newData.userId)
    .update({task:newData.task})
    .then(function(){
        res.send("success");
    })
    .catch(function(error){
        res.send(error);
    });
});

const api=functions.region("asia-northeast1").https.onRequest(app);
module.exports={api};
