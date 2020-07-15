import bcrypt from 'bcryptjs'
import data from '../../sampleData'
import { getLastUserID, getLastImageID } from './actions'
import ImageRepo from './image_postgres_repo'
import UserRepo from './user_postgres_repo'

const userRepo = new UserRepo()
const imageRepo = new ImageRepo()

/**
 * Array of sample Users
 * @constant {User[]} users
 */
const users = data.users
/**
 * Array of sample Images
 * @constant {Image[]} images
 */
const images = data.images

/**
 * Function that seed base two Users Martin and Batman\
 * and encrypts their passwords.
 * @async @function seedUsers
 * @returns {Promise<boolean>} promise
 */
const seedUsers = async (): Promise<boolean> => {
    const userCount = await getLastUserID()

    if (userCount < users.length) {
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
        return true
    } else {
        return false
    }
}

/**
 * Function that seed few images that contains coordinates
 * @async @function seedImages
 * @returns {Promise<boolean>} promise
 */
const seedImages = async (): Promise<boolean> => {
    const imageCount = await getLastImageID()

    if (imageCount < images.length) {
        for (const image of images) {
            await imageRepo.create(image)
        }
        return true
    } else {
        return false
    }
}

/**
 * Function that seed base two Users Martin and Batman\
 * and base few images that contains coordinates.
 * @async @function seed
 * @returns {Promise<void>} promise
 */
const seed = async (): Promise<void> => {
    try {
        await seedUsers()
        console.log('users have been seeded')
        await seedImages()
        console.log('images have been seeded')
    } catch (error) {
        throw Error(error)
    }
}

export default seed
