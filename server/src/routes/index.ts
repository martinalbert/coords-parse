import express, { Router, Request, Response } from 'express'
import multer from 'multer'
import { CreateImageController, GetImageController } from '../controllers'

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
})

const router: Router = express.Router()
const sampleData = {
    id: 0,
    imageName: 'test',
    lat: 49.002,
    long: 23.333,
    alt: 555,
}

const getImageController = new GetImageController(sampleData)
const createImageController = new CreateImageController(sampleData)

router.get('/image', (req: Request, res: Response) => getImageController.exec(req, res))
router.post('/image', upload.single('image'), (req: Request, res: Response) =>
    createImageController.exec(req, res)
)

export default router

// need to implement fileFilter
// check file extension for compatibility with ExifReader
// File type	Exif	IPTC	XMP	    ICC	    Thumbnail
// JPEG	        yes	    yes	    yes	    yes	    yes
// TIFF	        yes	    yes	    yes	    yes	    no
// PNG	        no	    no	    yes	    no	    no
// HEIC/HEIF	yes	    no	    no	    yes	    no
// WebP	        yes	    no	    yes	    yes	    yes
