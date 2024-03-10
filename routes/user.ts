
import express from 'express'
const router = express.Router();
import {
    createUser,
    loginUser,
    logoutUser
} from '../controllers/User';


router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body
    if (!userName) {
        return res.status(400).send({ message: "Please add the user name" })
    }
    if (!email) {
        return res.status(400).send({ message: "Please add the email Id" })
    }
    if (!password) {
        return res.status(400).send({ message: "Please add the password" })
    }
    try {
        const user = await createUser(req.body)
        res.status(200).send(user)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).send({ message: "Please provide your email" })
    }
    if (!password) {
        return res.status(400).send({ message: "Please provide your password" })
    }
    try {
        const user = await loginUser(req.body)
        res.status(200).send({ status: "success", ...user })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: "failed", err })

    }

})

router.post('/logout', async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).send({ message: "Please provide UserId" })
    }
    try {
        const user = await logoutUser(req.body)
        res.status(200).send({ status: "success", ...user })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: "failed", err })

    }

})

export default router