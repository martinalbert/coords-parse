import express, { Router, Request, Response } from 'express'
const router: Router = express.Router()
const exif = require('exif-js')

const get_coords = (req: Request, res: Response) => {
    const image = req.body
    res.status(200).send(image)
    
}

router.get('/get-coords', get_coords)

export default router