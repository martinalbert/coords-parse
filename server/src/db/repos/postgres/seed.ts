import data from '../../sampleData'
import ImageRepo from './image_postgres_repo'
import UserRepo from './user_postgres_repo'

const userRepo = new UserRepo()
const imageRepo = new ImageRepo()

const users = data.users
const images = data.images

/**
 * Helper Function\
 * Function that counts records of users and images.
 *
 * @async @function numberOfRecords
 * @return {Object} object with user count and endpoint count
 */
const numberOfRecords = async () => {
    const users = await userRepo.getAll()
    const userCount = users.length
    let imageCount = 0
    for (const user of users) {
        const images = await imageRepo.getAll(user.id)
        imageCount += images.length
    }
    return {
        userCount,
        imageCount,
    }
}

/**
 * Function that seed base two Users Applifting and Batman\
 * and base few images that can be monitored.
 * @async @function seed
 * @returns {Promise<void>} promise
 */
const seed = async (): Promise<void> => {
    const { userCount, imageCount } = await numberOfRecords()

    try {
        // seed users
        if (userCount < users.length) for (const user of users) await userRepo.register(user)

        // seed images to monitor
        if (imageCount < images.length)
            for (const image of images) await imageRepo.create(image)
    } catch (error) {
        throw Error(error)
    }
}

export default seed
