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
 * Function that sets the postgres sequence ID to ID of last record.
 *
 * @async @function resetSequence
 * @param  {string} tablename - name of table
 */
export const resetSequence = async (tablename: string) => {
    await sequelize.query(
        `SELECT setval(pg_get_serial_sequence('${tablename}', 'id'), coalesce(max(id), 1), true) FROM \"${tablename}\";`,
        { type: QueryTypes.SELECT }
    )
}

/**
 * Helper Function\
 * Function that gets the largest ID of Users in database.
 *
 * @async @function getLastUserID
 * @return {number} number of user last ID
 */
export const getLastUserID = async () => {
    const userCount = await sequelize.query(
        'SELECT coalesce(max(id), 0) AS count FROM "users";',
        { type: QueryTypes.SELECT }
    )
    return userCount[0].count
}

/**
 * Helper Function\
 * Function that gets the largest ID of Images in database.
 *
 * @async @function getLastImageID
 * @return {number} number of endpoint last ID
 */
export const getLastImageID = async () => {
    const imageCount = await sequelize.query(
        'SELECT coalesce(max(id), 0) AS count FROM "images";',
        { type: QueryTypes.SELECT }
    )
    return imageCount[0].count
}
