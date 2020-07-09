import { Request, Response, NextFunction } from 'express'
import { BaseController } from './BaseController'
import Parser from '../util/coords-parse'
import IImageRepo from '../db/repos/IImageRepo'
import Image from '../entities/Image'
import IUserRepo from '../db/repos/IUserRepo'
import User from '../entities/User'

/**
 * Controller Class\
 * Entity: Image\
 * Controller that handles HTTP Requests with method GET on endpoint /images/:id
 *
 * @class GetImageByIDController
 * @extends BaseController
 * @param  {IImageRepo} repo - Database repository of Images
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetImageByIDController extends BaseController {
    /**
     * @private Database repository of Images
     */
    private repo: IImageRepo

    /**
     * @constructor of GetImageByIDController
     * @param  {IImageRepo} imageRepo - Abstraction of database repository for Images
     * @returns {GetImageByIDController} instance of this class
     */
    constructor(imageRepo: IImageRepo) {
        super()
        this.repo = imageRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('getting Image by ID')
        // handle request
        try {
            const ID = Number(req.params.id)
            const uID = req.user.id
            const image = await this.repo.getByID(ID, uID)

            this.ok<Image>(res, image)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Image\
 * Controller that handles HTTP Requests with method GET on endpoint /images
 *
 * @class GetAllImagesController
 * @extends BaseController
 * @param  {IImageRepo} repo - Database repository of Images
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetAllImagesController extends BaseController {
    /**
     * @private Database repository of Images
     */
    private repo: IImageRepo

    /**
     * @constructor of GetAllImagesController
     * @param  {IImageRepo} imageRepo - Abstraction of database repository for Images
     * @returns {GetAllImagesController} instance of this class
     */
    constructor(imageRepo: IImageRepo) {
        super()
        this.repo = imageRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('getting all Images for logged User')
        // handle request
        try {
            const all = await this.repo.getAll(req.user.id)
            this.ok<Image[]>(res, all)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Image\
 * Controller that handles HTTP Requests with method POST on endpoint /images
 *
 * @class CreateImageController
 * @extends BaseController
 * @param  {IImageRepo} repo - Database repository of Images
 * @param  {IUserRepo} userRepo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class CreateImageController extends BaseController {
    /**
     * @private Database repository of Images
     */
    private repo: IImageRepo

    /**
     * @private Database repository of Users
     */
    private userRepo: IUserRepo

    /**
     * @constructor of CreateImageController
     * @param  {IImageRepo} imageRepo - Abstraction of database repository for Images
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {CreateImageController} instance of this class
     */
    constructor(imageRepo: IImageRepo, userRepo: IUserRepo) {
        super()
        this.repo = imageRepo
        this.userRepo = userRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        let user: User
        console.log('creating new Image')

        // get user
        try {
            const { id, email } = req.user
            user = await this.userRepo.getCurrent(id, email)
        } catch (error) {
            return this.unauthorized(next, error)
        }

        // handle request
        try {
            // get custom name from request body
            let imageName = undefined
            if (req.body.imageName) imageName = req.body.imageName

            // parse coordinates from image
            const coordsParser = new Parser(req.file.buffer)
            const coordinates = coordsParser.coordinates
            const name = req.file.originalname

            // create new Image
            let image: Image
            if (imageName) image = new Image(0, name, coordinates, user, imageName)
            else image = new Image(0, name, coordinates, user)

            // save record
            const newImage = await this.repo.create(image)
            this.created<Image>(res, newImage)
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}

/**
 * Controller Class\
 * Entity: Image\
 * Controller that handles HTTP Requests with method DELETE on endpoint /images/:id
 *
 * @class DeleteImageController
 * @extends BaseController
 * @param  {IImageRepo} repo - Database repository of Images
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class DeleteImageController extends BaseController {
    /**
     * @private Database repository of Images
     */
    private repo: IImageRepo

    /**
     * @constructor of DeleteImageController
     * @param  {IImageRepo} imageRepo - Abstraction of database repository for Images
     * @returns {DeleteImageController} instance of this class
     */
    constructor(imageRepo: IImageRepo) {
        super()
        this.repo = imageRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('Deleting Image')
        const ID = Number(req.params.id)
        const uID = req.user.id

        // find image that will be deleted
        try {
            await this.repo.getByID(ID, uID)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }

        // delete Image
        try {
            const deleted = await this.repo.delete(ID, uID)
            this.ok<Boolean>(res, deleted)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}
