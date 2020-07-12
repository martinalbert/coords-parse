import bcrypt from 'bcryptjs'
import data from '../../sampleData'
import { getLastID } from './actions'
import ImageRepo from './image_postgres_repo'
import UserRepo from './user_postgres_repo'

const userRepo = new UserRepo()
const imageRepo = new ImageRepo()

const users = data.users
const images = data.images

const seedUsers = async (): Promise<void> => {
    for (const user of users) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw new Error(err.message)

            bcrypt.hash(user.password, salt, async (err, hash) => {
                if (err) throw new Error(err.message)

                // replace password with hash
                user.password = hash

                // save record
                await userRepo.register(user)
            })
        })
    }
}

const seedImages = async (): Promise<void> => {
    for (const image of images) await imageRepo.create(image)
}

/**
 * Function that seed base two Users Applifting and Batman\
 * and base few images that can be monitored.
 * @async @function seed
 * @returns {Promise<void>} promise
 */
const seed = async (): Promise<void> => {
    try {
        const { imageCount, userCount } = await getLastID()

        // seed users
        if (userCount < users.length) await seedUsers()

        // seed images to monitor
        if (imageCount < images.length) await seedImages()
    } catch (error) {
        throw Error(error)
    }
}

export default seed
