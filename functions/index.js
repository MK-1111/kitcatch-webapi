const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');

const app =express();
app.use(cors({origin: true}));

//var serviceAccount = require("/home/star333/kitcatch/functions/serviceAccountKey.json");

admin.initializeApp();

var db=admin.firestore();

/*
app.get("/authentification",(req,res,next)=>{
    const authData=req.body;
    const db_password=db.db.collection("users").doc(authData.userId).get().then({
        
    })
    if(authData.password==db.collection("users").doc(authData.userId).get().then({
        
    })){
        res.send(true);
    }
    else{
        res.send(false);
    }
});
*/
app.post("/update_uuid",async (req,res,next)=>{
    try{
    const newUUid=req.body;
    const NowTime=new Date().getTime();
    db.collection("users").doc(req.body.userId).update({
        uuid:newUUid.uuid,
        IssueTime:NowTime
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

app.get("/get_uuid/:userId",async (req,res,next)=>{
    try{
        const uuidRef = await db.collection("users").doc(req.params.userId).get();
        if(uuidRef.exists){
            res.json({
                uuid:uuidRef.get("uuid"),
                IssueTime:uuidRef.get("IssueTime")
            });
        }else{
            res.send("user does not exist.");
        }
    }
    catch(error){
        next(error);
    }
});

app.get("/get_timetable/:userId",async (req,res,next)=>{
    try{
        const timetableRef = await db.collection("users").doc(req.params.userId).get();
        if(timetableRef.exists){
            res.send(timetableRef.get("timetable"));
        }else{
            res.send("user does not exist.");
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
            res.send("user does not exist.");
        }
    }
    catch(error){
        next(error);
    }
});


app.post("/post_timetable",(req,res,next)=>{
    const newData = req.body;
 //   if(newData.sessionId==db.collection("users").doc(newData.userId).get("sessionId")){
    db.collection("users").doc(newData.userId)
    .update({timetable:newData.timetable})
    .then(function(){
        res.send("posting timetable is success.");
    })
    .catch(function(error){
        res.send(error);
    });
//}
/*
else{
    res.send("sessionId is different.");
}
*/
});

app.post("/post_task",(req,res,next)=>{
    const newData = req.body;
    //if(newData.sessionId==db.collection("users").doc(newData.userId).get("sessionId")){
    db.collection("users").doc(newData.userId)
    .update({task:newData.task})
    .then(function(){
        res.send("postingsuccess");
    })
    .catch(function(error){
        res.send(error);
    });
//}
/*
else{
    res.send("sessionId is different.");
}
*/
});

const api=functions.region("asia-northeast1").https.onRequest(app);
module.exports={api};
