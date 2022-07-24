require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors())


//Routes
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)


//MongoDB connection
const URI = process.env.MONGODB_URL
mongoose.connect(URI, 
 err => {
    if(err) throw err;
    console.log('Connected to MongoDB')
})


// Below MongoDB and  Above Listen Sever
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}



//Listen server
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('server is running on port', PORT)
})