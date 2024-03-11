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

const port:string = process.env.PORT
const server = app.listen(process.env.PORT,()=> {
    console.log(`Listening to PORT ${port}`);
})

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
});

beforeAll(async () => {
  // Wait for server to start and database connection to establish
  await new Promise(resolve => server.on('listening', resolve));
});

afterAll(async () => {
  // Close server and mongoose connection
  await mongoose.connection.close();
  await server.close();
});

export default app