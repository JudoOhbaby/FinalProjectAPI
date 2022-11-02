const express = require('express')
const database = require('./Database/Firebase')
const fetch = require('node-fetch')
const FCM = require('fcm-node')
const db = database.database
const app = express()
const PORT = 4000
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.listen(PORT, () => {
    console.log('API Listening on PORT ${PORT}')
})

app.get('/', (req, res) => {
    res.send('API READY')
})

app.get('/Test', (req, res) => {
    res.send('testing..')
})

app.get('/TestFirebase', (req, res) => {
    db.ref().child('/test').update({ name: 2 }, (error) => {
        if (error) {
            console.log('error')
        } else {
            console.log('sucess')
            res.send('success')
        }
    })
})


app.get('/SendNotification', (req, res) => {
    var notification = {
        'title': 'Title',
        'text': 'Subtitle'
    }
    var fcm_tokens = ['cklQ3OosQAO-LFj5t8v_Ci:APA91bEV1R55sCbPMyMPGzU-UiSprnxR5cEmsc-9qab-GzAalaJ-vvh0GWvS90J05sS4hf3mYSIXYnr82R7NAccOKxYP0bG4LYipesf_1LYhQ5g54jJ-un_EEFUeSF_x5Go53exiMAC9'];
    var notification_body = {
        'notification': notification,
        'registration_ids': fcm_tokens
    }
    fetch('https://fcm.googleapis.com/fcm/send', {
        
        'method': 'POST',
        'headers': {
            'Authorization': 'key=' + 'AAAAjFdrMqE:APA91bF9kqi548NMd5PKO1iZc2FGHReyBocqZsVWQWqcMzjSRYnEdkClFGPiXnX4aJACZ-ySI7ASoL3rNl9c96fKlhLLyrb_YhVKuf29y9RRHBIlULsSthef1I9AMFCJ0xXa_d1sOr03',
            'Content-Type': 'application/json'
        },
        
        'body': {
            notification: {
              "title": "New chat message!",
              "body": "There is a new message in FriendlyChat"
            },
            to:"cklQ3OosQAO-LFj5t8v_Ci:APA91bEV1R55sCbPMyMPGzU-UiSprnxR5cEmsc-9qab-GzAalaJ-vvh0GWvS90J05sS4hf3mYSIXYnr82R7NAccOKxYP0bG4LYipesf_1LYhQ5g54jJ-un_EEFUeSF_x5Go53exiMAC9"
          }
    }).then((result) => {
        res.status(200).send('Notification Send Successfully:'+result)
        console.log(result)
    }).catch((err) => {
        res.status(400).send('Something Wrong')
        console.log(err)
    })
})

app.get('/TestFCM',(req,res)=>{
    var serverKey = 'AAAAjFdrMqE:APA91bF9kqi548NMd5PKO1iZc2FGHReyBocqZsVWQWqcMzjSRYnEdkClFGPiXnX4aJACZ-ySI7ASoL3rNl9c96fKlhLLyrb_YhVKuf29y9RRHBIlULsSthef1I9AMFCJ0xXa_d1sOr03'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'cklQ3OosQAO-LFj5t8v_Ci:APA91bEV1R55sCbPMyMPGzU-UiSprnxR5cEmsc-9qab-GzAalaJ-vvh0GWvS90J05sS4hf3mYSIXYnr82R7NAccOKxYP0bG4LYipesf_1LYhQ5g54jJ-un_EEFUeSF_x5Go53exiMAC9', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            res.send("Success")
            console.log("Successfully sent with response: ", response);
        }
    });
})

app.post('/TestReq',(req,res)=>{
    
    res.send(JSON.stringify(req.body))
})

app.post('/SensorUpdate',(req,res)=>{
    
    res.send(JSON.stringify(req.body.DeviceID))
})


module.exports = app