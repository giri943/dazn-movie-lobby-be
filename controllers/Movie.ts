import Movie from "../models/Movies";

export const createMovie = (movieData: any): Promise<{ movie: any}> => {
    return new Promise(async (resolve, reject) => {
        const movie = new Movie({ ...movieData });
        try {
            await movie.save();
            resolve({ movie});
        } catch (error) {
            reject({message:"Movie creation failed", error});
        }
    });
};


export const updateMovie = (movieId:string, movieData: any): Promise<{ updatedMovie: any}> => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieData, {new:true}).exec()       
            resolve({ updatedMovie});
        } catch (error) {
            reject({message:"Movie updation failed", error});
        }
    });
};

export const getAllMovies = (): Promise<{ movies: Array<any>}> => {
    return new Promise(async (resolve, reject) => {
        try {
            const movies = await Movie.find().sort({createdAt:-1}).exec()       
            resolve({movies});
        } catch (error) {
            reject({message:"Movie updation failed", error});
        }
    });
};

export const deleteMovie = (movieId:string): Promise<{ message: string}> => {
    return new Promise(async (resolve, reject) => {
        try {
            const movie = await Movie.findOne({_id:movieId})            
            if (!movie) {
                reject({message:"Movie not found"})
            }
            await Movie.findByIdAndDelete(movieId).exec()       
            resolve({message:"Movie Deleted"});
        } catch (error) {
            reject({message:"Movie deletion failed", error});
        }
    });
};
export const searchAllMovies = async (query: string): Promise<{ movies: any[] }> => {
    if (typeof query !== 'string') {
        throw new Error('Query parameter must be a string');
    }
    try {
        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, 
                { genre: { $regex: query, $options: 'i' } } 
            ]
        }).sort({ createdAt: -1 }).exec();

        return { movies };
    } catch (error) {
        throw new Error("Movie search failed: " + error.message);
    }
};