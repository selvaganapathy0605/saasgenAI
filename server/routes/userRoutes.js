import express from 'express'
import { auth } from '../middlewares/auth.js'
import { getPublicCreations, getUserCreations, toggleLikeCreation } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.get('/get-user-creations',auth,getUserCreations)
userRouter.get('/get-public-creations',auth,getPublicCreations)
userRouter.post('/toggle-like-creation',auth,toggleLikeCreation)

export default userRouter