import express from "express";
import postRoutes from './Posts'
import userRoutes from './Users'
const app = express();


app.use('/api/posts',postRoutes)
app.use('/api/users',userRoutes)

export default app

