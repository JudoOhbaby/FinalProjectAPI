const express = require('express')
const database = require('./Database/Firebase')
const db = database.database
const app = express()
const PORT = 4000

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

module.exports = app