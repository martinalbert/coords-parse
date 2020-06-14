import express, { Router, Request, Response } from 'express'
import multer from 'multer'
import { CreateRecordController, GetRecordController } from '../controllers'

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})
// need to implement fileFilter
// check file extension for compatibility with ExifReader
// File type	Exif	IPTC	XMP	    ICC	    Thumbnail
// JPEG	        yes	    yes	    yes	    yes	    yes
// TIFF	        yes	    yes	    yes	    yes	    no
// PNG	        no	    no	    yes	    no	    no
// HEIC/HEIF	yes	    no	    no	    yes	    no
// WebP	        yes	    no	    yes	    yes	    yes

const router: Router = express.Router()
const sampleData = {
    id: 0,
    imageName: 'test',
    lat: 49.002,
    long: 23.333,
    alt: 555
}

const getRecordController = new GetRecordController(sampleData)
const getImage = (req: Request, res: Response) => getRecordController.exec(req, res)

const createRecordController = new CreateRecordController(sampleData)
const sendImage = (req: Request, res: Response) => createRecordController.exec(req, res)

router.get('/image', getImage)
router.post('/image', upload.single('image'), sendImage)

export default router