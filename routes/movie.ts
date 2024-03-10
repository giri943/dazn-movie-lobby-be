import express from 'express'
import adminAuth from '../middlewares/adminAuth';
import {
    createMovie,
    updateMovie,
    getAllMovies,
    deleteMovie
} from "../controllers/Movie";


const router = express.Router()

router.post('/createMovie', adminAuth, async (req, res) => {
    const { title, genre, rating, streamLink } = req.body
    if (!title) {
        return res.status(400).send({ message: "Please provide the movie name" })
    }
    if (!genre) {
        return res.status(400).send({ message: "Please provide the movie genre" })
    }
    if (!rating) {
        return res.status(400).send({ message: "Please provide the movie rating" })
    }
    if (!streamLink) {
        return res.status(400).send({ message: "Please provide the movie streamLink" })
    }
    try {
        const movie = await createMovie(req.body)
        res.status(200).send({ message: "success", movie })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "failed", error })
    }
})

router.put('/updateMovie/:movieId', adminAuth, async (req, res) => {
    const { title, genre, rating, streamLink } = req.body
    let movieId: string | undefined = req.params.movieId as string | undefined;
    if (!title) {
        return res.status(400).send({ message: "Please provide the movie name" })
    }
    if (!genre) {
        return res.status(400).send({ message: "Please provide the movie genre" })
    }
    if (!rating) {
        return res.status(400).send({ message: "Please provide the movie rating" })
    }
    if (!streamLink) {
        return res.status(400).send({ message: "Please provide the movie streamLink" })
    }
    if (!movieId) {
        return res.status(400).send({ message: "Please provide the movie ID" })
    }
    try {
        const movie = await updateMovie(movieId, req.body)
        res.status(200).send({ message: "success", movie })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "failed", error })
    }
})

router.get('/movies', async (req, res) => {
    try {
        const movie = await getAllMovies()
        res.status(200).send({ message: "success", ...movie })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "failed", error })
    }
})

router.delete('/deleteMovie/:movieId', adminAuth, async (req, res) => {
    let movieId: string | undefined = req.params.movieId as string | undefined;
    try {
        const movie = await deleteMovie(movieId)
        res.status(200).send({status:"success",...movie })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "failed", error })
    }
})

export default router