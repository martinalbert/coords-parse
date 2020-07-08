import bcrypt from 'bcryptjs'
import errors from 'restify-errors'
import config from '../config'
import User from '../db/repos/postgres/models/User'

export default (email: string, password: string): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
            })
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw Error(err.message)
                if (isMatch) {
                    resolve(user)
                } else {
                    reject('Authentication failed')
                }
            })
        } catch (error) {
            reject('Authentication failed')
        }
    })
}
