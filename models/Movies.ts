import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    genre: {
        type:String,
        required: true,
    },
    rating:{
        type:Number,
        min:0,
        max:10,
        required: true,
    },
    streamLink:{
        type:String,
        required: true,
    }
},
{ timestamps: true })
export const Movie = mongoose.model('Movie', movieSchema);
export default Movie;