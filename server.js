const express = require ('express')
const app= express()
const mongoose= require('mongoose')
const dotenv= require('dotenv').config()


app.use(express.json())
app.use(express.text())
app.use('/api',require('./routes/personRoute'))
const port= process.env.PORT
mongoose.connect(process.env.MONGO_URI)
.then(console.log('database connected successfully'))
.catch(err=>{if (err) throw err})
app.listen(port,()=>{console.log('app listening on port',port)})
