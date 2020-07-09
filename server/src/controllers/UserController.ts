import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { BaseController } from './BaseController'
import config from '../config'
import IUserRepo from '../db/repos/IUserRepo'
import User from '../entities/User'
import auth from '../util/authenticate'

/**
 * Controller Class\
 * Entity: User\
 * Controller that handles HTTP Requests with method POST on endpoint /user/register
 *
 * @class UserRegisterController
 * @extends BaseController
 * @param  {IUserRepo} repo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class UserRegisterController extends BaseController {
    /**
     * @private Database repository of Users
     */
    private repo: IUserRepo

    /**
     * @constructor of UserRegisterController
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {UserRegisterController} instance of this class
     */
    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {NextFunction} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        if (!req.is('application/json')) return this.invalidContent(next)

        console.log('registering user')
        // handle request
        try {
            // get user information from Request body
            const { userName, email, pw } = req.body
            if (pw.length < 10)
                return this.invalidContent(next, 'Provide password longer than 10 characters.')

            // create new User
            const user = new User(0, userName, email, pw)

            // encrypt password and create new record
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw new Error(err.message)

                bcrypt.hash(user.password, salt, async (err, hash) => {
                    if (err) throw new Error(err.message)

                    // replace password with hash
                    user.password = hash

                    // save record
                    const newUser = await this.repo.register(user)
                    this.created<string>(res, 'User have been created.')
                })
            })
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: User\
 * Controller that handles HTTP Requests with method POST on endpoint /user/login
 *
 * @class UserLoginController
 * @extends BaseController
 * @param  {IUserRepo} repo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class UserLoginController extends BaseController {
    /**
     * @private Database repository of Users
     */
    private repo: IUserRepo

    /**
     * @constructor of UserLoginController
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {UserLoginController} instance of this class
     */
    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {NextFunction} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        if (!req.is('application/json')) return this.invalidContent(next)

        console.log('loging in user')
        let user: User
        // Authenticate
        try {
            const { email, pw } = req.body
            user = await auth(email, pw)
        } catch (err) {
            return this.unauthorized(next, err)
        }

        // handle request
        try {
            // Create payload for JWT
            const payload = {
                id: user.id,
                email: user.email,
            }

            // Create JWT
            const token = jwt.sign(payload, config.JWT_SECRET, {
                expiresIn: '15m',
            })

            this.ok<string>(res, token)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: User\
 * Controller that handles HTTP Requests with method GET on endpoint /users
 *
 * @class GetAllUsersController
 * @extends BaseController
 * @param  {IUserRepo} repo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetAllUsersController extends BaseController {
    /**
     * @private Database repository of Users
     */
    private repo: IUserRepo

    /**
     * @constructor of GetAllUsersController
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {GetAllUsersController} instance of this class
     */
    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {NextFunction} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('getting all users')
        // handle request
        try {
            const users = await this.repo.getAll()
            this.ok<User[]>(res, users)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}
