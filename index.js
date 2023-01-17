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
    db.ref().child('/test').update({ name: 3 }, (error) => {
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
            to: "cklQ3OosQAO-LFj5t8v_Ci:APA91bEV1R55sCbPMyMPGzU-UiSprnxR5cEmsc-9qab-GzAalaJ-vvh0GWvS90J05sS4hf3mYSIXYnr82R7NAccOKxYP0bG4LYipesf_1LYhQ5g54jJ-un_EEFUeSF_x5Go53exiMAC9"
        }
    }).then((result) => {
        res.status(200).send('Notification Send Successfully:' + result)
        console.log(result)
    }).catch((err) => {
        res.status(400).send('Something Wrong')
        console.log(err)
    })
})

app.get('/TestFCM', (req, res) => {
    var serverKey = 'AAAAjFdrMqE:APA91bF9kqi548NMd5PKO1iZc2FGHReyBocqZsVWQWqcMzjSRYnEdkClFGPiXnX4aJACZ-ySI7ASoL3rNl9c96fKlhLLyrb_YhVKuf29y9RRHBIlULsSthef1I9AMFCJ0xXa_d1sOr03'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'chhzmMVfRA648wfZSSAOyF:APA91bG1K6pNNoMtqGr7oYxDS3Dwo5eiOWcvwe4j-Nw6sSfbOECO_zejQ0NVX1S4-VK-ZEzwJgKsOBDUz-o1way0TaQmIDI-I059ntZ3XipJ44L07U-AT7wZlinvBC-hFqnT9-cCx-JZ',
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

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            res.send("Success")
            console.log("Successfully sent with response: ", response);
        }
    });
})

app.post('/TestReq', (req, res) => {

    res.send(JSON.stringify(req.body))
})

app.post('/SensorUpdate', (req, res) => {
    if (req.body.Sensor == "Temperature") {
        db.ref().child('Device/' + req.body.DeviceID + '/DeviceSensors').update({ Temperature: req.body.Temperature, Humidity: req.body.Humidity }, (error) => {
            if (error) {
                console.log('error')
            } else {
                console.log('sucess')

            }
        })
    }
    if (req.body.Sensor == "Gps") {
        db.ref().child('Device/' + req.body.DeviceID + '/DeviceSensors/Gps').update({ latitude: req.body.latitude, longitude: req.body.longitude }, (error) => {
            if (error) {
                console.log('error')
            } else {
                console.log('sucess')

            }
        })
    }
    if (req.body.Sensor == "Gyro") {
        db.ref().child('Device/' + req.body.DeviceID + '/DeviceSensors/Gyro').update({ x: req.body.x, y: req.body.y, z: req.body.z }, (error) => {
            if (error) {
                console.log('error')
            } else {
                console.log('sucess')

            }
        })
    }
    if (req.body.Sensor == "Key") {
        db.ref().child('Device/' + req.body.DeviceID + '/DeviceSensors').update({ KeyState: req.body.KeyState }, (error) => {
            if (error) {
                console.log('error')
            } else {
                console.log('sucess')

            }
        })
    }


    res.send(JSON.stringify(req.body.DeviceID))

})


app.post('/SendOtherNotification', (req, res) => {
    
    var serverKey = 'AAAAjFdrMqE:APA91bF9kqi548NMd5PKO1iZc2FGHReyBocqZsVWQWqcMzjSRYnEdkClFGPiXnX4aJACZ-ySI7ASoL3rNl9c96fKlhLLyrb_YhVKuf29y9RRHBIlULsSthef1I9AMFCJ0xXa_d1sOr03'; //put your server key here
    var fcm = new FCM(serverKey);
    const DeviceKeyState = ""
    if (req.body.Type == "Accident") {
        db.ref('Device/' + req.body.DeviceID).once('value', (snapshot) => {

            const User = snapshot.val().Owner;
            console.log(snapshot.val())
            const DeviceKeyState = snapshot.val().DeviceSensors.KeyState
            let OwnerID = ""
            for (var UserID in User) {
                OwnerID = UserID
                console.log(UserID)
                db.ref().child('UserData/' + UserID).update({ AccidentActive: true }, (error) => {
                    if (error) {
                        console.log('error')
                    } else {
                        console.log('sucess')

                    }
                })

                db.ref('UserData/' + UserID + '/Token').once('value', (snapshot) => {

                    const Token = snapshot.val();
                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                        to: Token,
                        collapse_key: 'your_collapse_key',

                        notification: {
                            title: 'Accident?',
                            body: 'ยืนนันความปลอดภัยหากคุณไม่เป็นไร',
                            android_channel_id: 'channel-id'
                        },

                        data: {  //you can send only notification or only data(or include both)
                            my_key: 'my value',
                            my_another_key: 'my another value'
                        }
                    };

                    fcm.send(message, function (err, response) {
                        if (err) {
                            console.log("Something has gone wrong!");
                        } else {
                            console.log("Successfully sent with response: ", response);
                        }
                    });
                    db.ref().child('UserData/' + UserID + '/Notification').push({ DeviceID: req.body.DeviceID, NotificationType: 'Accident', receive: false, receiver: 'Owner', latitude: 16.462385333, longitude: 102.827421667 }, (error) => {
                        if (error) {
                            console.log('error')
                        } else {
                            console.log('sucess')

                        }
                    })

                }, (errorObject) => {
                    console.log('The read failed: ' + errorObject.name);
                });
            }
            if (DeviceKeyState == '1') {
                /*====================================================== */
                setTimeout(() => {
                    db.ref('UserData/' + OwnerID + '/AccidentActive').once('value', (snapshot) => {
                        const AccidentActive = snapshot.val()
                        if (AccidentActive) {
                            db.ref().child('UserData/' + OwnerID).update({ AccidentActive: false }, (error) => {
                                if (error) {
                                    console.log('error')
                                } else {
                                    console.log('sucess')
            
                                }
                            })
                            db.ref('Device/' + req.body.DeviceID + '/Other').once('value', (snapshot) => {
                                const User = snapshot.val();
                                for (var UserID in User) {
                                    db.ref('UserData/' + UserID + '/Token').once('value', (snapshot) => {
                                        const Token = snapshot.val();
                                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                            to: Token,
                                            collapse_key: 'your_collapse_key',

                                            notification: {
                                                title: 'Accident!',
                                                body: 'คนรู้จักคุณเกิดอุบัติเหตุ'
                                            },

                                            data: {  //you can send only notification or only data(or include both)
                                                my_key: 'my value',
                                                my_another_key: 'my another value'
                                            }
                                        };

                                        fcm.send(message, function (err, response) {
                                            if (err) {
                                                console.log("Something has gone wrong!");
                                            } else {
                                                console.log("Successfully sent with response: ", response);
                                            }
                                        });
                                        db.ref().child('UserData/' + UserID + '/Notification').push({ DeviceID: req.body.DeviceID, NotificationType: 'Accident', receive: false, receiver: 'Other', latitude: 16.462385333, longitude: 102.827421667 }, (error) => {
                                            if (error) {
                                                console.log('error')
                                            } else {
                                                console.log('sucess')

                                            }
                                        })

                                    }, (errorObject) => {
                                        console.log('The read failed: ' + errorObject.name);
                                    });
                                }
                            }, (errorObject) => {
                                console.log('The read failed: ' + errorObject.name);
                            });
                        }
                    })

                }, 20000);

            }
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });


    }


    if (req.body.Type == "Steal") {
        db.ref('Device/' + req.body.DeviceID + '/Owner').once('value', (snapshot) => {
            const User = snapshot.val();
            for (var UserID in User) {
                db.ref('UserData/' + UserID + '/Token').once('value', (snapshot) => {
                    const Token = snapshot.val();
                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                        to: Token,
                        collapse_key: 'your_collapse_key',

                        notification: {
                            title: 'Steal',
                            body: 'รถของคุณโดนโขมย'
                        },

                        data: {  //you can send only notification or only data(or include both)
                            my_key: 'my value',
                            my_another_key: 'my another value'
                        }
                    };

                    fcm.send(message, function (err, response) {
                        if (err) {
                            console.log("Something has gone wrong!");
                        } else {
                            console.log("Successfully sent with response: ", response);
                        }
                    });
                    db.ref().child('UserData/' + UserID + '/Notification').push({ DeviceID: req.body.DeviceID, NotificationType: 'Steal', receive: false, receiver: 'Owner' }, (error) => {
                        if (error) {
                            console.log('error')
                        } else {
                            console.log('sucess')

                        }
                    })

                }, (errorObject) => {
                    console.log('The read failed: ' + errorObject.name);
                });
            }
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });


    }


    res.send('Sending...')

})


module.exports = app