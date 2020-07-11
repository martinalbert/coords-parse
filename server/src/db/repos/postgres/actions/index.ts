import { QueryTypes } from 'sequelize'
import sequelize from '../../../sequelize'
import { ImageRepo, UserRepo } from '../../../../db'

/**
 * Function that finds all users and deletes all theirs endpoints and results.
 * @async @function clearDB
 */
export const clearDB = async () => {
    const imageRepo = new ImageRepo()
    const userRepo = new UserRepo()
    const users = await userRepo.getAll()
    for (const user of users) {
        const images = await imageRepo.getAll(user.id)
        for (const image of images) {
            await imageRepo.delete(image.id, user.id)
        }
    }
}

/**
 * Function that drops all tables from database
 * @function dropAllTables
 */
export const dropAllTables = () => {
    sequelize.sync({ force: true })
}

/**
 * Helper Function\
 * Function that gets the last ID of users and images.
 *
 * @async @function getLastID
 * @return {Object} object with user last ID and endpoint last ID
 */
export const getLastID = async () => {
    const imageCount = await sequelize.query(
        'SELECT setval(\'images_id_seq\', (SELECT MAX(id) FROM "images"));',
        { type: QueryTypes.SELECT }
    )
    const userCount = await sequelize.query(
        'SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM "users"));',
        { type: QueryTypes.SELECT }
    )
    return {
        imageCount: Number(imageCount[0].setval),
        userCount: Number(userCount[0].setval),
    }
}
