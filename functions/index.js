const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.get_timetable = functions.https.onRequest((request, response) => {
  
});

exports.get_task=functions.https.onRequest((request, response) => {
  
});

exports.get_uuid=functions.https.onRequest((request, response) => {
  
});


exports.echo = functions.https.onRequest((request, response) => {
    const task = request.body
    console.log(JSON.stringify(task))
    // const firestore = admin.firestore()
    // const ref = firestore.collection("todos")
     response.send(JSON.stringify(task));
});
