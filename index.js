const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT,()=>{
    console.log('API Listening on PORT ${PORT}')
})

app.get('/',(req,res)=>{
    res.send('API READY')
})

app.get('/Test',(req,res)=>{
    res.send('testing..')
})

app.get('/TestFirebsae',(req,res)=>{
    try{
        set(ref(db,'test/'),{
            name:12
        })
    }catch(e){
        console.log(e)
    }
})

module.exports = app