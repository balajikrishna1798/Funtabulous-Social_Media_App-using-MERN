import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import postRoutes from '../routes/Posts'
import userRoutes from '../routes/Users'
import path from "path";
const __variableOfChoice = path.resolve();
const app = express();
const port = 5000;


app.use('/uploads',express.static(path.join(__variableOfChoice,"uploads")))
app.use(bodyParser.json({limit:"30mb"}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

app.use(cors())

app.use('/posts',postRoutes)
app.use('/users',userRoutes)

const URI = "mongodb+srv://Balaji:1234@cluster1.ux7bq.mongodb.net/Posts?retryWrites=true&w=majority"
mongoose.connect(URI).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`)
    })
})