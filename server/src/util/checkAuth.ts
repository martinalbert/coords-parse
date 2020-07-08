import { Request, Response, NextFunction } from 'express'
import errors from 'restify-errors'
import jwt from 'jsonwebtoken'
import config from '../config'

/**
 * Middleware Utility \
 * Function that authenticate User by decoding the token inside Authorization Header.
 * It serves as middleware to web frameworks.\
 *
 * @function checkAuth
 * @param  {Request} req - incoming HTTP Request
 * @param  {Response} res - HTTP Response
 * @param  {Next} next - Callback function
 */
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    let decoded: jwtObject
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            decoded = <jwtObject>jwt.verify(token, config.JWT_SECRET)
        } else {
            decoded = <any>{}
        }
    } catch (error) {
        return next(new errors.UnauthorizedError('You have no access'))
    }

    if (req.url === '/users') {
        const { user } = <any>decoded
        if (user !== 'root') return next(new errors.UnauthorizedError('You have no access'))
        next()
    } else {
        const { id, email } = decoded
        if (!id || !email) return next(new errors.UnauthorizedError('You have no access'))

        req.user = { id, email }
        next()
    }
}

export default checkAuth
