import  mongoose  from "mongoose";
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user'; 
import movieRoutes from './routes/movie'


const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

app.use("/api/user", userRoutes);
app.use('/api/movie', movieRoutes);

app.listen(3000,()=> {
    console.log("Listening to 3000",);
    
})

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
});
