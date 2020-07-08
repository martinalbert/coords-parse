import express, { Router, Request, Response } from 'express'
import multer from 'multer'
import checkAuth from '../util/checkAuth'
import { register, login, getAllUsers } from '../useCases/UserUseCases'

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
})

const router: Router = express.Router()

// router.get('/image', (req: Request, res: Response) => getImageController.exec(req, res))
// router.post('/image', upload.single('image'), (req: Request, res: Response) =>
//     createImageController.exec(req, res)
// )
router.get(
    '/users',
    (req, res, next) => checkAuth,
    async (req, res, next) => await getAllUsers.exec
)
router.post('/user/register', async (req, res, next) => await register.exec)
router.post('/user/login', async (req, res, next) => await login.exec)

export default router

// need to implement fileFilter
// check file extension for compatibility with ExifReader
// File type	Exif	IPTC	XMP	    ICC	    Thumbnail
// JPEG	        yes	    yes	    yes	    yes	    yes
// TIFF	        yes	    yes	    yes	    yes	    no
// PNG	        no	    no	    yes	    no	    no
// HEIC/HEIF	yes	    no	    no	    yes	    no
// WebP	        yes	    no	    yes	    yes	    yes
